import React from 'react';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PricingSection({ variant, onCtaClick }) {
  const features = [
    'Lifetime access to all 6 modules',
    '10+ real-world portfolio coding projects',
    'Full source code and GitHub repositories',
    'Academic certificate of course completion',
    'Community Q&A and peer code reviews'
  ];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Transparent Pricing</p>
          <h2 className="section-title">Invest in Your Practical Skills</h2>
          <p className="section-desc">
            {variant === 'B'
              ? 'Enroll today during our academic launch window and unlock an exclusive 60% discount.'
              : 'Standard course enrollment fee for all curriculum modules.'}
          </p>
        </div>

        <div className="pricing-wrapper">
          {variant === 'B' && (
            <div className="pricing-badge-popular">
              Most Popular • Save 60% Today
            </div>
          )}

          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            Full-Stack Web Development Course
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Complete curriculum covering HTML, CSS, JavaScript, React, Node.js & MongoDB
          </p>

          <div className="price-display">
            {variant === 'B' ? (
              <>
                <span className="price-original">₹4,999</span>
                <span className="price-current">₹1,999</span>
                <span className="discount-pill">60% OFF</span>
              </>
            ) : (
              <span className="price-current">₹4,999</span>
            )}
          </div>

          <ul className="pricing-features-list">
            {features.map((f, i) => (
              <li key={i}>
                <Check size={18} color="#10b981" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div>
            {variant === 'B' ? (
              <button
                type="button"
                className="btn-pricing-cta btn-hero-vb"
                onClick={() => onCtaClick('Pricing CTA')}
                id="pricing-primary-cta"
              >
                <span>Enroll Now – Claim 60% Off</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                className="btn-pricing-cta btn-hero-va"
                onClick={() => onCtaClick('Pricing CTA')}
                id="pricing-primary-cta"
              >
                <span>Learn More</span>
              </button>
            )}
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.825rem' }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>
              {variant === 'B'
                ? '🔒 7-Day Money Back Guarantee • Instant Access'
                : 'Standard course terms apply'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
