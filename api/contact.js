// Serverless quote/contact handler (Vercel / Netlify-compatible Node runtime).
// Sends enquiries via the Resend email API. Credentials are read from server-side
// environment variables only and are never exposed to the browser.
//
// Required environment variables:
//   RESEND_API_KEY   - API key from https://resend.com
//   CONTACT_TO       - inbox that receives enquiries (e.g. support@apexcoreenergy.com)
//   CONTACT_FROM     - verified sender, e.g. "ApexCore Website <web@apexcoreenergy.com>"

const MAX = { fullName: 100, email: 200, phone: 25, service: 120, propertyType: 120, location: 120, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recent = new Map(); // best-effort per-instance rate limit

const escapeHtml = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const str = (v) => (typeof v === 'string' ? v.trim() : '');

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
  body = body || {};

  // Honeypot filled: pretend success so bots learn nothing.
  if (body.company_website) return res.status(200).json({ ok: true });

  const f = {};
  for (const k of Object.keys(MAX)) f[k] = str(body[k]);

  const errors = [];
  if (f.fullName.length < 2) errors.push('fullName');
  if (!EMAIL_RE.test(f.email)) errors.push('email');
  if (f.phone.length < 7 || !/^[+()\d\s-]*$/.test(f.phone)) errors.push('phone');
  if (!f.service) errors.push('service');
  for (const k of Object.keys(MAX)) if (f[k].length > MAX[k]) errors.push(k);
  if (body.consent !== true) errors.push('consent');
  if (errors.length) return res.status(422).json({ error: 'Please check the highlighted fields', fields: [...new Set(errors)] });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  if (now - (recent.get(ip) || 0) < 20_000) return res.status(429).json({ error: 'Please wait a moment before sending another request' });
  recent.set(ip, now);

  const rows = [
    ['Name', f.fullName],
    ['Phone', f.phone],
    ['Email', f.email],
    ['Service', f.service],
    ['Property type', f.propertyType || '-'],
    ['Location', f.location || '-'],
  ];
  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#0a1f33">New solar quote request</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#0e2a45" cellpadding="6">
      ${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join('')}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;color:#0e2a45">${escapeHtml(f.message || '(no message)')}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: f.email,
        subject: `Quote request: ${f.service} (${f.fullName})`.slice(0, 160),
        html,
        text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${f.message || '(no message)'}`,
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
