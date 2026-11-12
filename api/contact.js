// Serverless contact handler (Vercel / Netlify-compatible Node runtime).
// Sends enquiries via the Resend email API. Credentials are read from server-side
// environment variables only and are never exposed to the browser.
//
// Required environment variables:
//   RESEND_API_KEY   - API key from https://resend.com
//   CONTACT_TO       - inbox that receives enquiries (e.g. support@apexcoreenergy.com)
//   CONTACT_FROM     - verified sender, e.g. "Apex Core Website <web@apexcoreenergy.com>"

const MAX = { fullName: 100, email: 200, phone: 25, subject: 140, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recent = new Map(); // best-effort per-instance rate limit

const escapeHtml = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    return res.status(503).json({ error: 'Contact service is not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid request' });
    }
  }
  const { fullName = '', email = '', phone = '', subject = '', message = '', consent, company_website } = body || {};

  // Honeypot filled: pretend success so bots learn nothing.
  if (company_website) return res.status(200).json({ ok: true });

  const errors = [];
  if (String(fullName).trim().length < 2 || fullName.length > MAX.fullName) errors.push('fullName');
  if (!EMAIL_RE.test(String(email)) || email.length > MAX.email) errors.push('email');
  if (phone && (phone.length > MAX.phone || !/^[+()\d\s-]*$/.test(phone))) errors.push('phone');
  if (String(subject).trim().length < 3 || subject.length > MAX.subject) errors.push('subject');
  if (String(message).trim().length < 20 || message.length > MAX.message) errors.push('message');
  if (consent !== true) errors.push('consent');
  if (errors.length) return res.status(422).json({ error: 'Please check the highlighted fields', fields: errors });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  if (now - (recent.get(ip) || 0) < 20_000) return res.status(429).json({ error: 'Please wait a moment before sending another message' });
  recent.set(ip, now);

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#071725">New website enquiry</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#102B40" cellpadding="6">
      <tr><td><b>Name</b></td><td>${escapeHtml(fullName)}</td></tr>
      <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><b>Phone</b></td><td>${escapeHtml(phone || '-')}</td></tr>
      <tr><td><b>Subject</b></td><td>${escapeHtml(subject)}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;color:#102B40">${escapeHtml(message)}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Website enquiry: ${String(subject).slice(0, 120)}`,
        html,
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || '-'}\nSubject: ${subject}\n\n${message}`,
      }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ error: 'Email service error' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler failure', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
