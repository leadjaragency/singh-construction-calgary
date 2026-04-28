'use client';

import { useState } from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
  delay?: number;
  variant?: 'dark' | 'light';
}

export default function ServiceCard({ icon, title, description, image, delay = 0, variant = 'dark' }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  const isLight = variant === 'light';

  const cardBg = isLight
    ? (hovered ? '#FFFFFF' : '#FFFFFF')
    : (hovered ? 'linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)' : 'linear-gradient(180deg, #1A1A1A 0%, #141414 100%)');

  const cardBorder = hovered
    ? '1px solid rgba(252,185,0,0.5)'
    : isLight ? '1px solid #DDE3EC' : '1px solid rgba(255,255,255,0.07)';

  const cardShadow = hovered
    ? isLight
      ? '0 20px 48px rgba(12,26,46,0.14), 0 0 30px rgba(252,185,0,0.08)'
      : '0 24px 64px rgba(0,0,0,0.55), 0 0 40px rgba(252,185,0,0.08)'
    : isLight
      ? '0 2px 16px rgba(12,26,46,0.08)'
      : '0 4px 20px rgba(0,0,0,0.3)';

  const imgGradient = isLight
    ? 'linear-gradient(to bottom, transparent 0%, #FFFFFF 100%)'
    : 'linear-gradient(to bottom, transparent 0%, #112240 100%)';

  return (
    <div
      className={`reveal reveal-delay-${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardBg,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        border: cardBorder,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: cardShadow,
        transition: 'all 0.38s ease',
        cursor: 'default',
      }}
    >
      {/* ── Photo header with gradient blend ── */}
      {image && (
        <div style={{
          position: 'relative',
          height: 200,
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.6s ease',
              display: 'block',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            backgroundColor: hovered ? 'rgba(0,0,0,0.20)' : 'rgba(0,0,0,0.35)',
            transition: 'background-color 0.4s ease',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '55%',
            background: imgGradient,
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 2,
            background: hovered ? 'linear-gradient(90deg, var(--gold) 0%, rgba(252,185,0,0.3) 100%)' : 'transparent',
            transition: 'background 0.35s ease',
          }} />
        </div>
      )}

      {/* ── Card body ── */}
      <div style={{ padding: '28px 28px 34px' }}>
        <div style={{
          width: 56, height: 56,
          background: hovered
            ? 'linear-gradient(135deg, var(--gold) 0%, #ffd000 100%)'
            : isLight ? 'rgba(252,185,0,0.10)' : 'rgba(252,185,0,0.10)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 18,
          border: hovered ? 'none' : '1px solid rgba(252,185,0,0.22)',
          boxShadow: hovered ? '0 6px 20px rgba(252,185,0,0.30)' : 'none',
          transition: 'all 0.35s ease',
          flexShrink: 0,
        }}>
          <i className={icon} style={{
            fontSize: 22,
            color: hovered ? '#0C1A2E' : 'var(--gold)',
            transition: 'color 0.35s ease',
          }} />
        </div>

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 19, fontWeight: 700,
          color: isLight ? 'var(--text-dark)' : '#E8EDF5',
          marginBottom: 12,
          letterSpacing: '-0.3px',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: 14.5,
          color: isLight
            ? (hovered ? 'var(--text-dark-sub)' : 'var(--text-dark-muted)')
            : (hovered ? 'rgba(232,237,245,0.88)' : 'var(--text-muted)'),
          lineHeight: 1.8,
          transition: 'color 0.35s ease',
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}
