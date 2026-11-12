import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import GlassPanel from '../components/GlassPanel';
import { Reveal } from '../components/Reveal';
import { SITE } from '../data/site';
import { services } from '../data/services';
import { breadcrumbSchema } from '../utils/seo';
import { EASE } from '../animations/motionVariants';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
];

const schema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .max(25)
    .regex(/^[+()\d\s-]*$/, 'Use digits, spaces and + ( ) - only')
    .optional()
    .or(z.literal('')),
  subject: z.string().trim().min(3, 'Please add a subject').max(140),
  message: z.string().trim().min(20, 'Please tell us a little more (at least 20 characters)').max(4000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm so we can respond to you' }) }),
  // Honeypot: real visitors never see or fill this.
  company_website: z.string().max(0).optional(),
});

// Contact endpoint: a serverless function (see /api/contact.js) or any form backend URL.
// Credentials live on the server only; nothing secret is shipped to the browser.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

function Field({ id, label, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
        {label} {required ? <span className="text-gold" aria-hidden="true">*</span> : <span className="normal-case tracking-normal text-white/40">(optional)</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 flex items-center gap-1.5 text-xs text-[#ff9b8a]">
            <AlertCircle size={13} aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  'w-full rounded-[2px] border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[0.95rem] text-white placeholder:text-white/35 transition focus:border-gold focus:bg-white/[0.07] focus:outline-none aria-[invalid=true]:border-[#ff9b8a]/70';

export default function Contact() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { subject: '', consent: false } });

  useEffect(() => {
    const s = params.get('subject');
    if (s) setValue('subject', `Enquiry: ${s}`);
  }, [params, setValue]);

  const onSubmit = async (data) => {
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, source: window.location.href }),
      });
      let body = {};
      try {
        body = await res.json();
      } catch {
        /* non-JSON response */
      }
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
      setStatus({ state: 'success', message: 'Thank you. Your message has been sent and our team will respond as soon as possible.' });
      reset({ fullName: '', email: '', phone: '', subject: '', message: '', consent: false });
    } catch (err) {
      setStatus({
        state: 'error',
        message: `We couldn't send your message just now${err?.message ? ` (${err.message})` : ''}. Please try again, or email us directly at ${SITE.email}.`,
      });
    }
  };

  const busy = isSubmitting || status.state === 'loading';
  const aria = (name) => ({ 'aria-invalid': errors[name] ? 'true' : 'false', 'aria-describedby': errors[name] ? `${name}-error` : undefined });

  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact Apex Core Oil and Energy Resources Ltd in Surulere, Lagos. Email support@apexcoreenergy.com or call +234 912 198 0737 for business enquiries."
        path="/contact"
        schema={[
          breadcrumbSchema(crumbs),
          { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Apex Core', url: `${SITE.url}/contact`, about: { '@id': `${SITE.url}/#organization` } },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title={['Start a', <em key="e">Conversation.</em>]}
        intro="Business enquiries, partnership proposals or general questions: we read every message and respond personally."
        shader
        compact
      />

      <section className="relative overflow-hidden bg-ink pb-28 md:pb-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Details */}
          <div className="space-y-4 lg:col-span-4">
            {[
              { icon: MapPin, label: 'Head Office', content: <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">12 Shade Shomefun Street,<br />Aguda, Surulere,<br />Lagos State, Nigeria.</a>, cta: { href: SITE.mapsUrl, text: 'Get directions', external: true } },
              { icon: Mail, label: 'Email', content: <a href={`mailto:${SITE.email}`} className="break-all hover:text-gold">{SITE.email}</a>, cta: { href: `mailto:${SITE.email}`, text: 'Send an email' } },
              { icon: Phone, label: 'Telephone', content: <a href={`tel:${SITE.phoneHref}`} className="hover:text-gold">{SITE.phoneDisplay}</a>, cta: { href: `tel:${SITE.phoneHref}`, text: 'Call now' } },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <GlassPanel className="rounded-[3px] p-7">
                  <div className="flex items-start gap-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                      <c.icon size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.26em] text-gold">{c.label}</h2>
                      <div className="mt-2 leading-relaxed text-white">{c.content}</div>
                      <a href={c.cta.href} {...(c.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-mist hover:text-gold">
                        {c.cta.text} <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </GlassPanel>
              </Reveal>
            ))}
            {SITE.features.whatsapp && (
              <Reveal>
                <a href={`https://wa.me/${SITE.phoneHref.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
                  <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp Enquiry
                </a>
              </Reveal>
            )}
            <Reveal>
              <p className="flex items-center gap-3 px-2 pt-2 text-sm text-mist">
                <Clock size={16} className="text-gold" aria-hidden="true" /> We aim to respond to enquiries promptly during business days.
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <div className="relative rounded-[3px] border border-white/10 bg-deep-2/80 p-7 md:p-12">
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Send us a <em className="serif text-gold">message.</em>
              </h2>
              <p className="mt-3 text-sm text-mist">Fields marked * are required.</p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 grid gap-6 md:grid-cols-2">
                <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
                  <input id="fullName" autoComplete="name" className={inputCls} placeholder="Your full name" {...register('fullName')} {...aria('fullName')} />
                </Field>
                <Field id="email" label="Email" required error={errors.email?.message}>
                  <input id="email" type="email" autoComplete="email" className={inputCls} placeholder="you@company.com" {...register('email')} {...aria('email')} />
                </Field>
                <Field id="phone" label="Phone" error={errors.phone?.message}>
                  <input id="phone" type="tel" autoComplete="tel" className={inputCls} placeholder="+234 ..." {...register('phone')} {...aria('phone')} />
                </Field>
                <Field id="subject" label="Subject" required error={errors.subject?.message}>
                  <input id="subject" list="subject-options" className={inputCls} placeholder="How can we help?" {...register('subject')} {...aria('subject')} />
                  <datalist id="subject-options">
                    <option value="Business partnership" />
                    <option value="General enquiry" />
                    {services.map((s) => (
                      <option key={s.slug} value={`Enquiry: ${s.title}`} />
                    ))}
                  </datalist>
                </Field>
                <div className="md:col-span-2">
                  <Field id="message" label="Message" required error={errors.message?.message}>
                    <textarea id="message" rows={6} className={`${inputCls} resize-y`} placeholder="Tell us about your enquiry" {...register('message')} {...aria('message')} />
                  </Field>
                </div>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_website">Leave this field empty</label>
                  <input id="company_website" tabIndex={-1} autoComplete="off" {...register('company_website')} />
                </div>
                <div className="md:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
                    <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#C6A15B]" {...register('consent')} {...aria('consent')} />
                    <span>
                      I agree that Apex Core may use these details to respond to my enquiry, as described in the{' '}
                      <Link to="/privacy-policy" className="text-gold underline-offset-4 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="consent-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-[#ff9b8a]">
                      <AlertCircle size={13} aria-hidden="true" /> {errors.consent.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-5 md:col-span-2 md:flex-row md:items-center md:justify-between">
                  <button type="submit" disabled={busy} className="btn btn-gold disabled:cursor-wait disabled:opacity-70" data-cursor="hover">
                    {busy ? (
                      <>
                        Sending <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Send Message <Send size={15} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-white/45">Your details are used only to respond to your enquiry.</p>
                </div>
              </form>

              <div aria-live="polite" className="mt-6">
                <AnimatePresence mode="wait">
                  {status.state === 'success' && (
                    <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ ease: EASE }} className="flex gap-3 rounded-[2px] border border-teal/40 bg-teal/10 p-4 text-sm text-white">
                      <CheckCircle2 size={18} className="shrink-0 text-teal" aria-hidden="true" /> {status.message}
                    </motion.div>
                  )}
                  {status.state === 'error' && (
                    <motion.div key="err" role="alert" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ ease: EASE }} className="flex gap-3 rounded-[2px] border border-[#ff9b8a]/40 bg-[#ff9b8a]/10 p-4 text-sm text-white">
                      <AlertCircle size={18} className="shrink-0 text-[#ff9b8a]" aria-hidden="true" /> {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Map: enabled once the exact location has been verified (SITE.features.mapEmbed) */}
        <div className="container-x mt-20">
          {SITE.features.mapEmbed ? (
            <div className="aspect-[16/7] overflow-hidden rounded-[3px] border border-white/10">
              <iframe
                title="Apex Core head office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent('12 Shade Shomefun Street, Aguda, Surulere, Lagos, Nigeria')}&output=embed`}
                className="h-full w-full grayscale invert-[0.9] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <Reveal>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-[3px] border border-white/10" data-cursor="hover">
                <div className="aspect-[16/6] bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                  <span className="relative grid h-14 w-14 place-items-center">
                    <span className="animate-pulse-ring absolute inset-0 rounded-full border border-gold" />
                    <MapPin className="text-gold" aria-hidden="true" />
                  </span>
                  <span className="text-lg font-semibold text-white">Aguda, Surulere, Lagos</span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold group-hover:text-gold-soft">
                    Open in Google Maps <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
