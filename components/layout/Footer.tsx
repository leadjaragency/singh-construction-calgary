import Image from 'next/image';

const services = [
  'Framing',
  'Foundation Work',
  'Tear-Down & Haul-Offs',
  'Site Management',
];

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A0A', paddingTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.6fr',
          gap: 48,
          paddingBottom: 52,
          borderBottom: '1px solid var(--divider)',
        }}>
          {/* Brand col */}
          <div>
            <Image
              src="/Logo.png"
              alt="Singh Construction Calgary"
              width={140}
              height={48}
              style={{ height: 48, width: 'auto', objectFit: 'contain' }}
            />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, margin: '18px 0 24px', maxWidth: 280 }}>
              Building Calgary&apos;s future with craftsmanship, integrity, and excellence. Quality construction services for residential and commercial projects.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: 'fab fa-facebook-f', href: '#' },
                { icon: 'fab fa-instagram', href: '#' },
                { icon: 'fab fa-linkedin-in', href: '#' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  style={{
                    width: 40, height: 40, borderRadius: 6,
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 15, transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--gold)';
                    e.currentTarget.style.color = '#0D0D0D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 24 }}>
              Services
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 0, listStyle: 'none', margin: 0 }}>
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 8, transition: 'var(--transition)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                  >
                    <i className="fas fa-chevron-right" style={{ fontSize: 10, color: 'var(--gold)' }} />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation col */}
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 24 }}>
              Navigation
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 0, listStyle: 'none', margin: 0 }}>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 8, transition: 'var(--transition)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                  >
                    <i className="fas fa-chevron-right" style={{ fontSize: 10, color: 'var(--gold)' }} />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 24 }}>
              Contact Us
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: 0, listStyle: 'none', margin: 0 }}>
              {[
                { icon: 'fas fa-map-marker-alt', content: 'Calgary, Alberta, Canada' },
                { icon: 'fas fa-phone', content: <a href="tel:+14031234567" style={{ color: 'rgba(255,255,255,0.45)' }}>+1 (403) 123-4567</a> },
                { icon: 'fas fa-envelope', content: <a href="mailto:info@singhconstructions.ca" style={{ color: 'rgba(255,255,255,0.45)' }}>info@singhconstructions.ca</a> },
                { icon: 'fas fa-clock', content: 'Mon–Fri: 7:00 AM – 6:00 PM' },
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <i className={item.icon} style={{ color: 'var(--gold)', fontSize: 16, marginTop: 2, flexShrink: 0, width: 16 }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{item.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '24px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Singh Construction Calgary. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <a
                key={l}
                href="#"
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', transition: 'var(--transition)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
