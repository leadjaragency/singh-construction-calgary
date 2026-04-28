'use client';

import { useState } from 'react';
import Link from 'next/link';

const items = [
  {
    src: '/Framing.jpg',
    title: 'Residential Framing',
    category: 'Framing',
    span: 'large', // takes 2 cols
  },
  {
    src: '/Foundation%20Work.jpg',
    title: 'Concrete Foundation',
    category: 'Foundation Work',
    span: 'small',
  },
  {
    src: '/Site%20Management.jpg',
    title: 'Site Management',
    category: 'Site Management',
    span: 'small',
  },
  {
    src: '/Tear-Down%20%26%20Haul-Offs.jpg',
    title: 'Tear-Down & Haul-Off',
    category: 'Tear-Down',
    span: 'large',
  },
];

function PortfolioCard({ item }: { item: typeof items[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#1A2535',
        cursor: 'pointer',
        gridColumn: item.span === 'large' ? 'span 2' : 'span 1',
        aspectRatio: item.span === 'large' ? '16/9' : '4/3',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.35s ease',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.title}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.6s ease',
        }}
      />

      {/* Permanent subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        transition: 'opacity 0.35s ease',
        opacity: hovered ? 1 : 0.7,
      }} />

      {/* Gold top accent line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(90deg, var(--gold), rgba(252,185,0,0.3))',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />

      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '20px 22px',
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'transform 0.35s ease',
      }}>
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-heading)',
          fontSize: 10, fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 5,
        }}>
          {item.category}
        </span>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 17, fontWeight: 700,
          color: '#fff', margin: 0,
        }}>
          {item.title}
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" style={{
      background: '#F2F4F7',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top divider accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 4,
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.3,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-tag">Our Work</span>
          <h2 className="section-title dark">Built in Calgary. Built to Last.</h2>
          <p className="section-subtitle dark">
            A look at the projects we&apos;ve delivered — from framing to foundations, tear-downs to site management.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {items.map((item) => (
            <PortfolioCard key={item.title} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 36px',
              fontFamily: 'var(--font-heading)',
              fontSize: 13, fontWeight: 700, letterSpacing: '1.5px',
              textTransform: 'uppercase',
              backgroundColor: 'transparent', color: 'var(--gold)',
              borderRadius: 6, border: '2px solid var(--gold)',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--gold)';
              e.currentTarget.style.color = '#0D0D0D';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--gold)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View All Projects <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #portfolio .reveal > div:nth-child(1),
          #portfolio .reveal > div:nth-child(4) {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 520px) {
          #portfolio .reveal {
            grid-template-columns: 1fr !important;
          }
          #portfolio .reveal > div {
            grid-column: span 1 !important;
            aspect-ratio: 4/3 !important;
          }
        }
      `}</style>
    </section>
  );
}
