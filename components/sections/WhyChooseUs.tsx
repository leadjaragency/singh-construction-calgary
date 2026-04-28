'use client';

import { useEffect, useRef, useState } from 'react';

interface StatProps {
  target: number;
  suffix?: string;
  label: string;
  desc: string;
}

function AnimatedStat({ target, suffix = '', label, desc }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setCount(target); return; }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 2200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '32px 24px', borderRight: '1px solid var(--divider)' }} className="stat-item">
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(44px, 6vw, 68px)',
        fontWeight: 900, color: 'var(--gold)', lineHeight: 1, marginBottom: 8,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 12, fontWeight: 700, letterSpacing: '2.5px',
        textTransform: 'uppercase', color: 'var(--text)', marginBottom: 6,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{desc}</div>
    </div>
  );
}

const stats = [
  { target: 13, suffix: '+', label: 'Years Experience', desc: 'Serving Calgary since 2013' },
  { target: 200, suffix: '+', label: 'Projects Completed', desc: 'Residential & commercial builds' },
  { target: 100, suffix: '%', label: 'Client Satisfaction', desc: 'Proud of every project we deliver' },
];

const reasons = [
  { icon: 'fas fa-shield-alt', title: 'Licensed & Insured', text: 'Fully licensed general contractor with comprehensive liability insurance and WCB coverage for your peace of mind.' },
  { icon: 'fas fa-dollar-sign', title: 'Transparent Pricing', text: 'No hidden fees or surprises. We provide detailed, itemised quotes and keep you informed at every stage.' },
  { icon: 'fas fa-calendar-check', title: 'On-Time Delivery', text: 'We respect your schedule. Our project management ensures your build is completed on time and on budget.' },
  { icon: 'fas fa-medal', title: 'Quality Craftsmanship', text: 'Every project is built to last. We use premium materials and skilled tradespeople for results that stand the test of time.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why" style={{
      background: 'linear-gradient(180deg, #0D0D0D 0%, #111111 50%, #0D0D0D 100%)',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 300,
        background: 'radial-gradient(ellipse, rgba(252,185,0,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="section-tag">Why Singh Construction</span>
          <h2 className="section-title">Built on Trust &amp; Quality</h2>
          <p className="section-subtitle">
            We don&apos;t just build structures — we build lasting relationships with every client in Calgary.
          </p>
        </div>

        {/* Stats row */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          background: 'linear-gradient(135deg, #1A1A1A 0%, #141414 100%)',
          borderRadius: 14,
          overflow: 'hidden',
          border: '1px solid rgba(252,185,0,0.2)',
          marginBottom: 72,
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(252,185,0,0.05)',
        }}>
          {stats.map((s) => (
            <AnimatedStat key={s.label} {...s} />
          ))}
        </div>

        {/* Why cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
        }}>
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #141414 100%)',
                borderRadius: 12,
                padding: '36px 28px',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(252,185,0,0.4)';
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(252,185,0,0.07)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 62, height: 62,
                background: 'linear-gradient(135deg, rgba(252,185,0,0.15) 0%, rgba(252,185,0,0.05) 100%)',
                borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
                border: '1px solid rgba(252,185,0,0.2)',
              }}>
                <i className={r.icon} style={{ fontSize: 24, color: 'var(--gold)' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
                {r.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(252,185,0,0.15);
          }
          .stat-item:last-child { border-bottom: none; }
          #why > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
