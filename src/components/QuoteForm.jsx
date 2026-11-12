import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { services } from '../data/services';
import { SITE } from '../data/site';

const schema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name').max(100),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number')
    .max(25)
    .regex(/^[+()\d\s-]*$/, 'Use digits, spaces and + ( ) - only'),
  email: z.string().trim().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please choose a service'),
  propertyType: z.string().optional(),
  location: z.string().trim().max(120).optional(),
  message: z.string().trim().max(4000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm so we can contact you' }) }),
  company_website: z.string().max(0).optional(), // honeypot
});

// Serverless handler (see /api/contact.js) or any form backend URL. No secrets in the browser.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

const PROPERTY_TYPES = ['Home / Residential', 'Office / Commercial', 'Factory / Industrial', 'School / Hospital / Institution', 'Estate / Community', 'Farm / Agriculture'];

function Err({ id, msg }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#e0574a]">
      <AlertCircle size={13} aria-hidden="true" /> {msg}
    </p>
  );
}

/**
 * Quote / site-survey request form.
 * dark: for navy panels. compact: hides the optional property, location and message fields.
 */
export default function QuoteForm({ dark = false, compact = false, defaultService = '' }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { service: defaultService, consent: false } });

  useEffect(() => {
    if (defaultService) setValue('service', defaultService);
  }, [defaultService, setValue]);

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
      setStatus({ state: 'success', message: 'Thank you! Your request has been received. An ApexCore energy advisor will contact you shortly.' });
      reset({ fullName: '', phone: '', email: '', service: defaultService, propertyType: '', location: '', message: '', consent: false });
    } catch (err) {
      setStatus({
        state: 'error',
        message: `We couldn't send your request${err?.message ? ` (${err.message})` : ''}. Please call ${SITE.phoneDisplay} or email ${SITE.email}.`,
      });
    }
  };

  const busy = isSubmitting || status.state === 'loading';
  const inp = `input ${dark ? 'input-dark' : ''}`;
  const lbl = `mb-1.5 block text-sm font-semibold ${dark ? 'text-white/85' : 'text-navy'}`;
  const a = (n) => ({ 'aria-invalid': errors[n] ? 'true' : 'false', 'aria-describedby': errors[n] ? `${n}-err` : undefined });
  const uid = compact ? 'q' : 'qf';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`${uid}-name`} className={lbl}>
          Full name *
        </label>
        <input id={`${uid}-name`} autoComplete="name" className={inp} placeholder="Your name" {...register('fullName')} {...a('fullName')} />
        <Err id="fullName-err" msg={errors.fullName?.message} />
      </div>
      <div>
        <label htmlFor={`${uid}-phone`} className={lbl}>
          Phone *
        </label>
        <input id={`${uid}-phone`} type="tel" autoComplete="tel" className={inp} placeholder="+234 ..." {...register('phone')} {...a('phone')} />
        <Err id="phone-err" msg={errors.phone?.message} />
      </div>
      <div className={compact ? 'sm:col-span-2' : ''}>
        <label htmlFor={`${uid}-email`} className={lbl}>
          Email *
        </label>
        <input id={`${uid}-email`} type="email" autoComplete="email" className={inp} placeholder="you@example.com" {...register('email')} {...a('email')} />
        <Err id="email-err" msg={errors.email?.message} />
      </div>
      <div className={compact ? 'sm:col-span-2' : ''}>
        <label htmlFor={`${uid}-service`} className={lbl}>
          Service needed *
        </label>
        <select id={`${uid}-service`} className={inp} {...register('service')} {...a('service')}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet, please advise</option>
        </select>
        <Err id="service-err" msg={errors.service?.message} />
      </div>
      {!compact && (
        <>
          <div>
            <label htmlFor={`${uid}-ptype`} className={lbl}>
              Property type
            </label>
            <select id={`${uid}-ptype`} className={inp} {...register('propertyType')}>
              <option value="">Select type</option>
              {PROPERTY_TYPES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${uid}-loc`} className={lbl}>
              Location
            </label>
            <input id={`${uid}-loc`} className={inp} placeholder="e.g. Lekki, Lagos" {...register('location')} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${uid}-msg`} className={lbl}>
              Tell us about your power needs
            </label>
            <textarea
              id={`${uid}-msg`}
              rows={5}
              className={`${inp} resize-y`}
              placeholder="Appliances you want to power, hours of outage, current generator size, monthly fuel spend..."
              {...register('message')}
            />
          </div>
        </>
      )}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${uid}-hp`}>Leave this field empty</label>
        <input id={`${uid}-hp`} tabIndex={-1} autoComplete="off" {...register('company_website')} />
      </div>
      <div className="sm:col-span-2">
        <label className={`flex cursor-pointer items-start gap-3 text-sm ${dark ? 'text-white/70' : 'text-body'}`}>
          <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#1f9d55]" {...register('consent')} {...a('consent')} />
          <span>
            I agree to be contacted about my request, as described in the{' '}
            <Link to="/privacy-policy" className={`font-semibold underline-offset-4 hover:underline ${dark ? 'text-solar-400' : 'text-solar-600'}`}>
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <Err id="consent-err" msg={errors.consent?.message} />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {busy ? (
            <>
              Sending <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              {compact ? 'Book Free Survey' : 'Request My Free Quote'} <Send size={15} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <div aria-live="polite" className="sm:col-span-2">
        {status.state === 'success' && (
          <p className="flex gap-3 rounded-xl border border-solar/40 bg-solar/10 p-4 text-sm text-current">
            <CheckCircle2 size={18} className="shrink-0 text-solar" aria-hidden="true" /> <span className={dark ? 'text-white' : 'text-navy'}>{status.message}</span>
          </p>
        )}
        {status.state === 'error' && (
          <p role="alert" className="flex gap-3 rounded-xl border border-[#e0574a]/40 bg-[#e0574a]/10 p-4 text-sm">
            <AlertCircle size={18} className="shrink-0 text-[#e0574a]" aria-hidden="true" /> <span className={dark ? 'text-white' : 'text-navy'}>{status.message}</span>
          </p>
        )}
      </div>
    </form>
  );
}
