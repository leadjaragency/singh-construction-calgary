'use client';

import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import type { ContactFormData } from '@/types/contact';

const SERVICES = [
  'General Contracting',
  'Home Renovations',
  'Commercial Construction',
  'Custom Home Builds',
  'Basement Development',
  'Project Management',
  'Other',
];

const BUDGETS = ['Under $10,000', '$10,000 – $50,000', '$50,000 – $100,000', '$100,000+', 'Not sure yet'];

const empty: ContactFormData = { name: '', email: '', phone: '', service: '', budget: '', message: '', website: '' };

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(empty);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = () => {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.service) e.service = 'Please select a service';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Please provide at least 20 characters';
    return e;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSendError(false);

    // Honeypot check
    if (form.website !== '') { setSuccess(true); return; }

    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          service: form.service,
          budget: form.budget || 'Not specified',
          message: form.message,
          to_email: 'info@singhconstructions.ca',
          reply_to: form.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setSuccess(true);
      setForm(empty);
    } catch {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        textAlign: 'center', padding: '48px 28px',
        backgroundColor: 'rgba(39,174,96,0.08)',
        border: '2px solid #27ae60',
        borderRadius: 10, color: '#27ae60',
      }}>
        <i className="fas fa-check-circle" style={{ fontSize: 48, marginBottom: 16 }} />
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
          Enquiry Sent!
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(39,174,96,0.85)' }}>
          Thank you for reaching out. We&apos;ll be in touch within 1 business day.
        </p>
        <button
          onClick={() => setSuccess(false)}
          style={{
            marginTop: 24,
            fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: '#27ae60', background: 'none', border: '2px solid #27ae60',
            borderRadius: 4, padding: '10px 22px', cursor: 'pointer',
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => handleChange('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Row: name + email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="form-row">
        <Field label="Full Name" required error={errors.name}>
          <input
            type="text"
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="John Smith"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <input
            type="email"
            className={`form-input${errors.email ? ' error' : ''}`}
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </Field>
      </div>

      {/* Row: phone + service */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="form-row">
        <Field label="Phone Number" required error={errors.phone}>
          <input
            type="tel"
            className={`form-input${errors.phone ? ' error' : ''}`}
            placeholder="+1 (403) 000-0000"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </Field>
        <Field label="Service Interested In" required error={errors.service}>
          <select
            className={`form-select${errors.service ? ' error' : ''}`}
            value={form.service}
            onChange={(e) => handleChange('service', e.target.value)}
          >
            <option value="">Select a service…</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      {/* Budget */}
      <Field label="Estimated Budget">
        <select
          className="form-select"
          value={form.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
        >
          <option value="">Select a budget range (optional)</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>

      {/* Message */}
      <Field label="Project Description" required error={errors.message}>
        <textarea
          className={`form-textarea${errors.message ? ' error' : ''}`}
          placeholder="Tell us about your project — what you need, your timeline, any specific requirements…"
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
        />
      </Field>

      {/* Server error */}
      {sendError && (
        <div style={{
          padding: '14px 18px',
          backgroundColor: 'rgba(231,76,60,0.1)',
          border: '1px solid rgba(231,76,60,0.4)',
          borderRadius: 6, fontSize: 14, color: '#e74c3c',
        }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: 8 }} />
          Something went wrong. Please call us directly at{' '}
          <a href="tel:+14031234567" style={{ color: '#e74c3c', fontWeight: 600 }}>+1 (403) 123-4567</a>.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '16px 36px',
          fontFamily: 'var(--font-heading)',
          fontSize: 13, fontWeight: 700, letterSpacing: '1.5px',
          textTransform: 'uppercase',
          backgroundColor: loading ? 'var(--text-muted)' : 'var(--gold)',
          color: '#0D0D0D',
          border: 'none', borderRadius: 6,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'var(--transition)',
          alignSelf: 'flex-start',
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'var(--gold-hover)'; }}
        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'var(--gold)'; }}
      >
        {loading ? (
          <><i className="fas fa-spinner fa-spin" /> Sending…</>
        ) : (
          <><i className="fas fa-paper-plane" /> Send Enquiry</>
        )}
      </button>

      <style>{`
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 11, fontWeight: 700,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--text)',
      }}>
        {label}{required && <span style={{ color: 'var(--gold)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: 12, color: '#e74c3c' }}>{error}</span>
      )}
    </div>
  );
}
