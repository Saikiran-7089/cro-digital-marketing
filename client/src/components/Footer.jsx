import React from 'react';
import { BookOpen, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            <BookOpen size={20} color="#38bdf8" />
            <span>CRO Lab • SkillBoost Academy</span>
          </div>
          <p style={{ maxWidth: '480px', color: '#94a3b8', fontSize: '0.85rem' }}>
            An academic student project for Digital Marketing demonstrating practical concepts of
            Conversion Rate Optimization (CRO), A/B Testing, Form Simplification, and Real-Time Event Tracking.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <li>
                <button type="button" onClick={() => { onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: '#cbd5e1' }}>
                  Landing Page
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('dashboard')} style={{ color: '#cbd5e1' }}>
                  CRO Analytics Dashboard
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Academic Integrity</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>Zero hardcoded numbers</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
              All metrics calculated from actual database events.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
        © {new Date().getFullYear()} CRO Lab — Digital Marketing Course Assignment. Designed for college submission &amp; viva presentation.
      </div>
    </footer>
  );
}
