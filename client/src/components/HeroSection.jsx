import React from 'react';
import { ArrowRight, CheckCircle2, Star, Sparkles, BookOpen } from 'lucide-react';

export default function HeroSection({ variant, onCtaClick }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          {variant === 'B' ? (
            <>
              <div className="hero-badge hero-badge-vb">
                <Sparkles size={14} className="text-blue-600" />
                <span>Optimized Variant B • High Conversion Design</span>
              </div>
              <h1 className="hero-title">
                Build Real-World Web Apps and <span className="hero-title-highlight">Become Job Ready</span>
              </h1>
              <p className="hero-desc">
                Master HTML, CSS, JavaScript, React, Node.js and MongoDB through 10+ hands-on projects.
                Gain practical development skills and launch your tech career with confidence.
              </p>
              <div className="hero-actions">
                <button
                  type="button"
                  className="btn-hero-vb"
                  onClick={() => onCtaClick('Hero Primary CTA')}
                  id="hero-primary-cta"
                >
                  <span>Enroll Now – Save 60%</span>
                  <ArrowRight size={18} />
                </button>
                <a href="#curriculum" className="btn-secondary">
                  Explore Curriculum
                </a>
              </div>
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span><strong>4.9 / 5</strong> rating</span>
                </div>
                <div className="trust-item">
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>10+ Real Projects</span>
                </div>
                <div className="trust-item">
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Verified Certificate</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="hero-badge hero-badge-va">
                <span>Baseline Variant A • Original Control Design</span>
              </div>
              <h1 className="hero-title">
                Learn Full-Stack Development
              </h1>
              <p className="hero-desc">
                Learn HTML, CSS, JavaScript, React, Node.js and MongoDB through practical lessons.
                A structured course covering frontend and backend technologies for students.
              </p>
              <div className="hero-actions">
                <button
                  type="button"
                  className="btn-hero-va"
                  onClick={() => onCtaClick('Hero Primary CTA')}
                  id="hero-primary-cta"
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </button>
                <a href="#curriculum" className="btn-secondary">
                  View Syllabus
                </a>
              </div>
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <BookOpen size={16} color="#64748b" />
                  <span>Online lessons</span>
                </div>
                <div className="trust-item">
                  <span>Standard certification</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="hero-visual">
          <img
            src="/course-preview.svg"
            alt="SkillBoost Academy Interactive Coding Project Workspace"
            className="hero-img"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
