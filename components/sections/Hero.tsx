'use client';

import { useEffect, useState, useCallback } from 'react';

const slides = [
  {
    src: '/Random/IMG-20260305-WA0013.jpg',
    headline: 'Building Quality',
    accent: 'You Can Trust.',
    sub: 'Singh Construction Calgary — delivering exceptional craftsmanship across residential and commercial projects for over 13 years.',
  },
  {
    src: '/Random/IMG-20260305-WA0046.jpg',
    headline: 'Expert Framing,',
    accent: 'Built Right.',
    sub: 'Precise, code-compliant framing that forms the strong backbone of every structure we build across Calgary.',
  },
  {
    src: '/Random/IMG-20260305-WA0079.jpg',
    headline: 'Foundations',
    accent: 'That Last.',
    sub: 'Engineered concrete foundations poured right the first time — built to withstand Calgary\'s toughest conditions.',
  },
  {
    src: '/Random/IMG-20260305-WA0112.jpg',
    headline: 'Site Management',
    accent: 'Done Smart.',
    sub: 'From groundbreak to final inspection — your project runs on time, on budget, and with full transparency.',
  },
  {
    src: '/Random/IMG-20260305-WA0141.jpg',
    headline: 'Clean Tear-Downs,',
    accent: 'Fresh Starts.',
    sub: 'Safe demolition and complete haul-offs so your next build begins on a clean, cleared site.',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 600);
  }, [transitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
        overflow: 'hidden',
      }}
    >
      {/* Slide backgrounds — all rendered, opacity toggled */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${slide.src}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: i === current ? (transitioning ? 0 : 0.38) : 0,
            transition: transitioning ? 'opacity 0.6s ease' : 'opacity 1.2s ease',
            zIndex: 0,
          }}
        />
      ))}

      {/* Directional gradient overlay — dark left for text, fading right */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.78) 45%, rgba(13,13,13,0.35) 100%)',
      }} />

      {/* Bottom vignette for depth */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1,
        height: 200,
        background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 100%)',
      }} />

      {/* Gold ambient glow behind the text area */}
      <div style={{
        position: 'absolute', top: '30%', left: '-5%', zIndex: 1,
        width: 500, height: 400,
        background: 'radial-gradient(ellipse, rgba(252,185,0,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto',
        padding: '150px 24px 110px',
        width: '100%',
      }}>
        <div style={{ maxWidth: 700 }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-heading)',
            fontSize: 11, fontWeight: 700, letterSpacing: '4px',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: 28,
          }}>
            <span style={{ display: 'block', width: 36, height: 2, backgroundColor: 'var(--gold)', flexShrink: 0 }} />
            Calgary&apos;s Trusted Construction Partner
          </div>

          {/* Headline — fades with slide */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(38px, 6.5vw, 72px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.08,
              marginBottom: 24,
              letterSpacing: '-1px',
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            {slides[current].headline}<br />
            <span style={{ color: 'var(--gold)' }}>{slides[current].accent}</span>
          </h1>

          {/* Sub — fades with slide */}
          <p
            style={{
              fontSize: 18, color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75, marginBottom: 48, maxWidth: 520,
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
              transition: 'opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s',
            }}
          >
            {slides[current].sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 72 }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 34px',
                fontFamily: 'var(--font-heading)',
                fontSize: 13, fontWeight: 700, letterSpacing: '1.5px',
                textTransform: 'uppercase',
                backgroundColor: 'var(--gold)', color: '#0D0D0D',
                borderRadius: 6, border: '2px solid var(--gold)',
                transition: 'var(--transition)', cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gold-hover)';
                e.currentTarget.style.borderColor = 'var(--gold-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gold)';
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-paper-plane" /> Get a Free Quote
            </a>
            <a
              href="/projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 34px',
                fontFamily: 'var(--font-heading)',
                fontSize: 13, fontWeight: 700, letterSpacing: '1.5px',
                textTransform: 'uppercase',
                backgroundColor: 'transparent', color: '#fff',
                borderRadius: 6, border: '2px solid rgba(255,255,255,0.45)',
                transition: 'var(--transition)', cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#0D0D0D';
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-images" /> View Our Work
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            {[
              { number: '13+', label: 'Years Experience' },
              { number: '200+', label: 'Projects Completed' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 36, fontWeight: 900,
                  color: 'var(--gold)', lineHeight: 1,
                }}>
                  {s.number}
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 11, fontWeight: 600,
                  letterSpacing: '1.5px',
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase',
                  marginTop: 5,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 10,
        zIndex: 3,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 3,
              borderRadius: 2,
              backgroundColor: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.4s ease, background-color 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, right: 40,
        zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'var(--font-heading)',
        fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase',
      }}>
        <div style={{ width: 1, height: 48, backgroundColor: 'rgba(255,255,255,0.2)' }} />
        Scroll
      </div>

      <style>{`
        @media (max-width: 640px) {
          #hero > div:last-of-type { display: none; }
        }
      `}</style>
    </section>
  );
}
