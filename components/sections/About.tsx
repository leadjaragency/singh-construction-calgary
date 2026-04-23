export default function About() {
  const features = [
    'Licensed & Insured',
    'WCB Compliant',
    'On-Time Delivery',
    'Transparent Pricing',
    'Quality Guaranteed',
    'Local Calgary Team',
  ];

  return (
    <section id="about" style={{ backgroundColor: 'var(--bg)', padding: '90px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}>
          {/* Image side */}
          <div className="reveal-left" style={{ position: 'relative' }}>
            {/* Outer frame with gold accent border */}
            <div style={{
              position: 'absolute', top: -12, left: -12, right: 28, bottom: 28,
              border: '2px solid rgba(212,160,23,0.25)',
              borderRadius: 12,
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            <div style={{
              width: '100%', aspectRatio: '4/3',
              borderRadius: 10, overflow: 'hidden',
              position: 'relative', zIndex: 1,
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Framing.jpg"
                alt="Singh Construction Calgary — framing work"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
              {/* Subtle dark vignette on edges for depth */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Years badge */}
            <div style={{
              position: 'absolute', bottom: -24, right: -24, zIndex: 2,
              background: 'linear-gradient(135deg, #D4A017 0%, #F0B429 100%)',
              color: '#0D0D0D',
              padding: '22px 18px', borderRadius: 10,
              textAlign: 'center',
              boxShadow: '0 12px 40px rgba(212,160,23,0.4)',
              minWidth: 116,
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 900, lineHeight: 1 }}>
                13+
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 9, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: 6, lineHeight: 1.5 }}>
                Years of<br />Excellence
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="reveal-right">
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 16 }}>
              Calgary&apos;s Construction<br />
              <span style={{ color: 'var(--gold)' }}>Experts You Can Trust</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 14 }}>
              Singh Construction Calgary has been building and renovating homes and commercial spaces across Calgary and Alberta for over 13 years. Founded on the principles of quality, integrity, and client satisfaction, we bring every project to life with the same dedication we&apos;d give our own home.
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 28 }}>
              Our experienced team handles everything from initial design consultation through to final walkthrough — so you always know exactly where your project stands.
            </p>

            {/* Feature list */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 36 }}>
              {features.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--gold)', fontSize: 15, flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>

            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 30px',
                fontFamily: 'var(--font-heading)',
                fontSize: 13, fontWeight: 700, letterSpacing: '1.5px',
                textTransform: 'uppercase',
                backgroundColor: 'var(--gold)', color: '#0D0D0D',
                borderRadius: 6, border: '2px solid var(--gold)',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gold-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Your Project <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #about > div > div {
            grid-template-columns: 1fr !important;
            gap: 52px !important;
          }
          #about .reveal-right { padding-right: 0 !important; }
        }
        @media (max-width: 768px) {
          #about > div > div > div:first-child > div:last-child {
            right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
