import ContactForm from '../ui/ContactForm';

const hours = [
  { day: 'Monday – Friday', time: '7:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function Contact() {
  return (
    <section id="contact" style={{ backgroundColor: 'var(--bg)', padding: '90px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Request a Free Quote</h2>
          <p className="section-subtitle">
            Ready to start your project? Fill out the form and we&apos;ll get back to you within 1 business day.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: 60,
          alignItems: 'start',
        }}>
          {/* Left — contact info */}
          <div className="reveal-left">
            {/* Info items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
              {[
                {
                  icon: 'fas fa-map-marker-alt',
                  label: 'Location',
                  value: 'Calgary, Alberta, Canada',
                },
                {
                  icon: 'fas fa-phone',
                  label: 'Phone',
                  value: (
                    <a href="tel:+16132030424" style={{ color: 'var(--text)', transition: 'var(--transition)' }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text)')}
                    >
                      +1 (613) 203-0424
                    </a>
                  ),
                },
                {
                  icon: 'fas fa-envelope',
                  label: 'Email',
                  value: (
                    <a href="mailto:info@singhconstructions.ca" style={{ color: 'var(--text)', transition: 'var(--transition)' }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text)')}
                    >
                      info@singhconstructions.ca
                    </a>
                  ),
                },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 52, height: 52, backgroundColor: 'var(--gold-dim)',
                    borderRadius: 12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className={item.icon} style={{ fontSize: 20, color: 'var(--gold)' }} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 10, fontWeight: 700,
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'var(--text-muted)', marginBottom: 4,
                    }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', lineHeight: 1.5 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderRadius: 10, padding: '28px 24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 12, fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--text)', marginBottom: 18,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <i className="fas fa-clock" style={{ color: 'var(--gold)' }} />
                Business Hours
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: 0, listStyle: 'none', margin: 0 }}>
                {hours.map((h, i) => (
                  <li key={h.day} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: 14, padding: '12px 0',
                    borderBottom: i < hours.length - 1 ? '1px solid var(--divider)' : 'none',
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>{h.day}</span>
                    <span style={{
                      fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700,
                      color: h.time === 'Closed' ? 'var(--text-muted)' : 'var(--text)',
                    }}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right" style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: 12, padding: '48px 40px',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 24, fontWeight: 800,
              color: 'var(--text)', marginBottom: 6,
            }}>
              Send Us an Enquiry
            </h3>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
              All fields marked <span style={{ color: 'var(--gold)' }}>*</span> are required.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #contact > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          #contact > div > div:nth-child(2) > div:last-child {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
