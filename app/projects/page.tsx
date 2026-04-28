'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';

const BASE = '/Random/IMG-20260305-';

const imageNames = [
  'WA0013','WA0014','WA0015','WA0016','WA0017','WA0018','WA0019','WA0020',
  'WA0021','WA0022','WA0025','WA0026','WA0027','WA0028','WA0029','WA0030',
  'WA0031','WA0032','WA0033','WA0034','WA0035','WA0036','WA0037','WA0038',
  'WA0040','WA0042','WA0044','WA0045','WA0046','WA0047','WA0048','WA0049',
  'WA0052','WA0054','WA0055','WA0059','WA0060','WA0061','WA0062','WA0063',
  'WA0064','WA0069','WA0070','WA0071','WA0072','WA0073','WA0074','WA0075',
  'WA0076','WA0077','WA0078','WA0079','WA0084','WA0085','WA0086','WA0087',
  'WA0089','WA0090','WA0094','WA0095','WA0096','WA0097','WA0098','WA0099',
  'WA0100','WA0102','WA0103','WA0104','WA0105','WA0106','WA0108','WA0109',
  'WA0110','WA0111','WA0112','WA0113','WA0114','WA0115','WA0116','WA0117',
  'WA0118','WA0119','WA0120','WA0121','WA0122','WA0123','WA0124','WA0125',
  'WA0126','WA0127','WA0128','WA0129','WA0134','WA0135','WA0136','WA0137',
  'WA0138','WA0139','WA0140','WA0141','WA0146','WA0147','WA0149','WA0150',
  'WA0152','WA0154',
];

const allProjects = imageNames.map((name, i) => ({ id: i, src: `${BASE}${name}.jpg` }));

/* ─── Lightbox ── */
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer', color: '#fff', fontSize: 18,
          width: 42, height: 42, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <i className="fas fa-times" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Project photo"
        style={{
          maxWidth: '90vw', maxHeight: '85vh',
          objectFit: 'contain', borderRadius: 8,
          boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ─── Card ── */
function ProjectCard({ src, onOpen }: { src: string; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{
        position: 'relative',
        aspectRatio: '4/3',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'var(--surface)',
        cursor: 'zoom-in',
        border: hovered ? '1px solid rgba(252,185,0,0.4)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered ? '0 20px 56px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.32s ease',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Project"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.55s ease',
        }}
      />

      {/* Subtle vignette on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.25)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.32s ease',
      }} />

      {/* Gold top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, var(--gold), rgba(252,185,0,0.2))',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.38s ease',
      }} />

      {/* Zoom icon */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        width: 36, height: 36, borderRadius: '50%',
        background: 'rgba(252,185,0,0.9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(0.6)',
        transition: 'opacity 0.28s ease, transform 0.28s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      }}>
        <i className="fas fa-search-plus" style={{ fontSize: 14, color: '#0D0D0D' }} />
      </div>
    </div>
  );
}

/* ─── Page ── */
export default function ProjectsPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <section style={{
        position: 'relative',
        padding: '160px 24px 100px',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: '#0D0D0D',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/Random/IMG-20260305-WA0094.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.13,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.55) 50%, rgba(13,13,13,0.95) 100%)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 700, height: 350,
          background: 'radial-gradient(ellipse, rgba(252,185,0,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: 'var(--font-heading)', fontSize: 11, letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24,
          }}>
            <Link href="/" style={{ color: 'var(--gold)' }}>Home</Link>
            <i className="fas fa-chevron-right" style={{ fontSize: 9 }} />
            <span>Our Projects</span>
          </div>

          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700,
            letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: 18,
          }}>
            <span style={{ display: 'block', width: 28, height: 1.5, backgroundColor: 'var(--gold)' }} />
            Our Work
            <span style={{ display: 'block', width: 28, height: 1.5, backgroundColor: 'var(--gold)' }} />
          </span>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 5.5vw, 62px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.08, marginBottom: 22, letterSpacing: '-1px',
          }}>
            Projects That <span style={{ color: 'var(--gold)' }}>Speak</span><br />
            for Themselves
          </h1>

          <p style={{
            fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8,
            maxWidth: 540, margin: '0 auto 32px',
          }}>
            {allProjects.length} photos from real jobs completed across Calgary — framing, foundations, tear-downs, and site management.
          </p>

          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { n: '13+', l: 'Years in Business' },
              { n: '200+', l: 'Projects Completed' },
              { n: '100%', l: 'Client Satisfaction' },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 30, fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 10, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{
        background: 'linear-gradient(180deg, #0D0D0D 0%, #0f0e09 100%)',
        padding: '64px 0 100px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 18,
          }}>
            {allProjects.map((p) => (
              <ProjectCard key={p.id} src={p.src} onOpen={() => setLightboxSrc(p.src)} />
            ))}
          </div>

          {/* CTA */}
          <div style={{
            textAlign: 'center', marginTop: 80,
            paddingTop: 60, borderTop: '1px solid var(--divider)',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700,
              letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)',
              marginBottom: 16,
            }}>
              <span style={{ display: 'block', width: 24, height: 1.5, backgroundColor: 'var(--gold)' }} />
              Ready to Start?
              <span style={{ display: 'block', width: 24, height: 1.5, backgroundColor: 'var(--gold)' }} />
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              fontWeight: 800, color: '#fff', marginBottom: 14,
            }}>
              Let&apos;s Build Something Together
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 16, maxWidth: 480, margin: '0 auto 32px' }}>
              Get a free, no-obligation quote from Calgary&apos;s trusted construction team.
            </p>
            <Link
              href="/#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 42px',
                fontFamily: 'var(--font-heading)',
                fontSize: 13, fontWeight: 700, letterSpacing: '1.5px',
                textTransform: 'uppercase',
                backgroundColor: 'var(--gold)', color: '#0D0D0D',
                borderRadius: 6, border: '2px solid var(--gold)',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gold-hover)';
                e.currentTarget.style.borderColor     = 'var(--gold-hover)';
                e.currentTarget.style.transform       = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gold)';
                e.currentTarget.style.borderColor     = 'var(--gold)';
                e.currentTarget.style.transform       = 'translateY(0)';
              }}
            >
              <i className="fas fa-paper-plane" /> Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}

      <Footer />
    </>
  );
}
