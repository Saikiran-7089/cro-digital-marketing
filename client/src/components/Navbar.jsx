import React from 'react';
import { BookOpen, BarChart3, Sparkles } from 'lucide-react';

export default function Navbar({ variant, onOpenModal, onNavigate }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a 
          href="#home" 
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="logo-icon">
            <BookOpen size={20} />
          </div>
          <span>SkillBoost Academy</span>
        </a>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li><a href="#benefits" className="nav-link">Why SkillBoost</a></li>
            <li><a href="#curriculum" className="nav-link">Curriculum</a></li>
            <li><a href="#testimonials" className="nav-link">Reviews</a></li>
            <li><a href="#pricing" className="nav-link">Pricing</a></li>
            <li>
              <button 
                type="button"
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2563eb', fontWeight: 600 }}
                onClick={() => onNavigate('dashboard')}
              >
                <BarChart3 size={15} /> Dashboard
              </button>
            </li>
          </ul>
        </nav>

        <div>
          {variant === 'B' ? (
            <button
              type="button"
              className="nav-cta-btn nav-cta-vb"
              onClick={() => onOpenModal('Navbar CTA')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> Enroll Now
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="nav-cta-btn nav-cta-va"
              onClick={() => onOpenModal('Navbar CTA')}
            >
              Learn More
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
