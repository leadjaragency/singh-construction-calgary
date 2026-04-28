'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Home',     hash: 'hero' },
  { label: 'Services', hash: 'services' },
  { label: 'About',    hash: 'about' },
  { label: 'Contact',  hash: 'contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();
  const isHome   = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const smoothScrollTo = (hash: string) => {
    const el = document.querySelector(`#${hash}`);
    if (!el) return;
    const navH = document.getElementById('navbar')?.offsetHeight ?? 0;
    const top  = el.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  /* Click handler for section links.
     - On homepage  → prevent default + smooth scroll
     - On other pages → let Link/href navigate to /#hash (default behaviour) */
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    closeMenu();
    if (isHome) {
      e.preventDefault();
      smoothScrollTo(hash);
    }
  };

  const linkStyle: React.CSSProperties = {
    fontFamily:    'var(--font-heading)',
    fontSize:      12,
    fontWeight:    700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color:         'rgba(255,255,255,0.82)',
    padding:       '8px 14px',
    borderRadius:  4,
    transition:    'var(--transition)',
    display:       'inline-block',
  };

  const mobileLinkStyle: React.CSSProperties = {
    fontFamily:    'var(--font-heading)',
    fontSize:      14,
    fontWeight:    700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color:         'rgba(255,255,255,0.82)',
    padding:       '14px 0',
    display:       'block',
    transition:    'var(--transition)',
  };

  return (
    <>
      {/* Mobile overlay */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 998 }}
        />
      )}

      <nav
        id="navbar"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '100%',
          zIndex:          1000,
          backgroundColor: scrolled ? '#0C1A2E' : 'transparent',
          boxShadow:       scrolled ? '0 2px 24px rgba(0,0,0,0.5)' : 'none',
          padding:         scrolled ? '12px 0' : '20px 0',
          transition:      'background-color 0.4s ease, padding 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* ── Logo ── always goes to homepage */}
          <Link href="/" onClick={isHome ? (e) => { e.preventDefault(); smoothScrollTo('hero'); } : undefined} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image
              src="/Logo.png"
              alt="Singh Construction Calgary"
              width={220}
              height={76}
              style={{ height: 76, width: 'auto', objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* ── Desktop nav ── */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">

            {navLinks.map((l) => (
              <li key={l.hash}>
                <a
                  href={isHome ? `#${l.hash}` : `/#${l.hash}`}
                  onClick={(e) => handleSectionClick(e, l.hash)}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.82)')}
                >
                  {l.label}
                </a>
              </li>
            ))}

            {/* Projects page link */}
            <li>
              <Link
                href="/projects"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.82)')}
              >
                Projects
              </Link>
            </li>

            {/* Get a Quote CTA */}
            <li>
              <a
                href={isHome ? '#contact' : '/#contact'}
                onClick={(e) => handleSectionClick(e, 'contact')}
                style={{
                  ...linkStyle,
                  color:        'var(--gold)',
                  padding:      '9px 20px',
                  border:       '2px solid var(--gold)',
                  marginLeft:   10,
                  letterSpacing:'1px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--gold)';
                  e.currentTarget.style.color           = '#0D0D0D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color           = 'var(--gold)';
                }}
              >
                Get a Quote
              </a>
            </li>
          </ul>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer', padding: 4, background: 'none', border: 'none', zIndex: 1001 }}
            className="hamburger-btn"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display:         'block',
                  width:           26,
                  height:          2,
                  backgroundColor: 'var(--text)',
                  borderRadius:    2,
                  transition:      'var(--transition)',
                  transform:       menuOpen
                    ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                    : 'none'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        <ul
          style={{
            position:        'fixed',
            top:             0,
            right:           menuOpen ? 0 : '-100%',
            width:           290,
            height:          '100vh',
            backgroundColor: '#0C1A2E',
            display:         'flex',
            flexDirection:   'column',
            padding:         '100px 32px 48px',
            gap:             0,
            transition:      'right 0.35s ease',
            boxShadow:       '-12px 0 48px rgba(0,0,0,0.5)',
            zIndex:          999,
            overflowY:       'auto',
            listStyle:       'none',
            margin:          0,
          }}
          className="mobile-nav"
        >
          {navLinks.map((l) => (
            <li key={l.hash} style={{ borderBottom: '1px solid var(--divider)' }}>
              <a
                href={isHome ? `#${l.hash}` : `/#${l.hash}`}
                onClick={(e) => handleSectionClick(e, l.hash)}
                style={mobileLinkStyle}
              >
                {l.label}
              </a>
            </li>
          ))}

          <li style={{ borderBottom: '1px solid var(--divider)' }}>
            <Link href="/projects" onClick={closeMenu} style={mobileLinkStyle}>
              Projects
            </Link>
          </li>

          <li style={{ marginTop: 20 }}>
            <a
              href={isHome ? '#contact' : '/#contact'}
              onClick={(e) => handleSectionClick(e, 'contact')}
              style={{
                fontFamily:      'var(--font-heading)',
                fontSize:        13,
                fontWeight:      700,
                letterSpacing:   '1px',
                color:           '#0D0D0D',
                backgroundColor: 'var(--gold)',
                padding:         '14px',
                display:         'block',
                textAlign:       'center',
                borderRadius:    4,
              }}
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav   { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
