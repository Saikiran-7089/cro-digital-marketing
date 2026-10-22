import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

export default function SocialProof({ variant }) {
  const testimonials = [
    {
      initials: 'RM',
      name: 'Rohan M.',
      role: 'Junior Developer Intern (Fictional)',
      quote: 'Building the hands-on projects helped me understand concepts much faster than just watching videos. The React section was crystal clear.'
    },
    {
      initials: 'AK',
      name: 'Ananya K.',
      role: 'Computer Applications Student (Fictional)',
      quote: 'Simple explanations and practical assignments. Before this course, backend APIs felt intimidating, but Express & MongoDB made complete sense.'
    },
    {
      initials: 'DP',
      name: 'Dev P.',
      role: 'Final Year B.Tech Student (Fictional)',
      quote: 'The portfolio project gave me genuine confidence during college placement technical interviews. Exactly what I needed for practical practice.'
    }
  ];

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">
            {variant === 'B' ? 'Student Success Stories' : 'Feedback'}
          </p>
          <h2 className="section-title">
            {variant === 'B'
              ? 'What Our Learners Say'
              : 'Course Reviews'}
          </h2>
          <p className="section-desc">
            {variant === 'B'
              ? 'Fictional peer experiences demonstrating social proof principles in Conversion Rate Optimization.'
              : 'Student comments on course structure and assignments.'}
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div>
                {variant === 'B' && (
                  <div className="stars-rating" aria-label="5 stars">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={15} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                )}
                <p className="testimonial-quote">“{t.quote}”</p>
              </div>

              <div className="student-meta">
                <div className="student-avatar">{t.initials}</div>
                <div className="student-info">
                  <h5>{t.name}</h5>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
