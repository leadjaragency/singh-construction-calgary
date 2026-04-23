import ServiceCard from '../ui/ServiceCard';

const services = [
  {
    icon: 'fas fa-border-all',
    title: 'Framing',
    image: '/Framing.jpg',
    description: 'From wall framing to roof structures, we deliver precise, code-compliant framing for residential and commercial projects across Calgary. Every structure is built square, level, and strong — the right way from day one.',
  },
  {
    icon: 'fas fa-mountain',
    title: 'Foundation Work',
    image: '/Foundation%20Work.jpg',
    description: 'A solid foundation is the cornerstone of any lasting structure. We excavate, form, and pour concrete foundations engineered to withstand Calgary\'s tough climate — inspected and done right the first time.',
  },
  {
    icon: 'fas fa-truck',
    title: 'Tear-Down & Haul-Offs',
    image: '/Tear-Down%20%26%20Haul-Offs.jpg',
    description: 'Need a structure removed or a site cleared? We handle complete demolition and debris removal safely and efficiently. From old garages to full structures, we leave your site clean and ready for the next phase.',
  },
  {
    icon: 'fas fa-clipboard-list',
    title: 'Site Management',
    image: '/Site%20Management.jpg',
    description: 'Our on-site management keeps your project organized, on schedule, and on budget. We coordinate trades, manage timelines, handle permits, and provide clear progress updates every step of the way.',
  },
];

export default function Services() {
  return (
    <section id="services" style={{
      background: 'linear-gradient(180deg, var(--bg) 0%, #0f0e0a 50%, var(--bg) 100%)',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle center glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(212,160,23,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="section-tag">What We Do</span>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Specialized construction services built on 13+ years of hands-on experience across Calgary and surrounding areas.
          </p>
        </div>

        {/* Grid — 2×2 for 4 services */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
        }}>
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              image={s.image}
              description={s.description}
              delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
