'use client';

import { useState } from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
  delay?: number;
}

export default function ServiceCard({ icon, title, description, image, delay = 0 }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`reveal reveal-delay-${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(180deg, #181818 0%, #141414 100%)',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        border: hovered ? '1px solid rgba(212,160,23,0.45)' : '1px solid rgba(255,255,255,0.06)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 64px rgba(0,0,0,0.65), 0 0 40px rgba(212,160,23,0.08)'
          : '0 4px 20px rgba(0,0,0,0.3)',
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
          {/* Overlay tint — darkens the image slightly for consistency */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundColor: hovered ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.40)',
            transition: 'background-color 0.4s ease',
          }} />
          {/* Gradient blend: image → card background (seamless fade) */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '55%',
            background: 'linear-gradient(to bottom, transparent 0%, #181818 100%)',
          }} />
          {/* Gold bottom line on hover */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 2,
            background: hovered ? 'linear-gradient(90deg, var(--gold) 0%, rgba(212,160,23,0.3) 100%)' : 'transparent',
            transition: 'background 0.35s ease',
          }} />
        </div>
      )}

      {/* ── Card body ── */}
      <div style={{ padding: '28px 28px 34px' }}>
        {/* Icon */}
        <div style={{
          width: 56, height: 56,
          background: hovered
            ? 'linear-gradient(135deg, var(--gold) 0%, #f0b429 100%)'
            : 'rgba(212,160,23,0.10)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 18,
          border: hovered ? 'none' : '1px solid rgba(212,160,23,0.20)',
          boxShadow: hovered ? '0 6px 20px rgba(212,160,23,0.30)' : 'none',
          transition: 'all 0.35s ease',
          flexShrink: 0,
        }}>
          <i className={icon} style={{
            fontSize: 22,
            color: hovered ? '#0D0D0D' : 'var(--gold)',
            transition: 'color 0.35s ease',
          }} />
        </div>

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 19, fontWeight: 700,
          color: '#fff',
          marginBottom: 12,
          letterSpacing: '-0.3px',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: 14.5,
          color: hovered ? 'rgba(229,229,229,0.85)' : 'var(--text-muted)',
          lineHeight: 1.8,
          transition: 'color 0.35s ease',
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}
