import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Check } from 'lucide-react';

export default function VivaCheatSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const qaList = [
    {
      q: 'What is Conversion Rate Optimization (CRO)?',
      a: 'CRO is the systematic, data-driven marketing process of improving website page design, messaging, and user experience to increase the percentage of visitors who complete a desired macro or micro action (e.g. course registration, CTA click, purchase).'
    },
    {
      q: 'What is the Conversion Rate calculation formula?',
      a: 'Conversion Rate (%) = (Total Conversions ÷ Total Unique Visitors) × 100. For example, if 250 visitors visit Variant B and 32 enroll, the conversion rate is (32 / 250) * 100 = 12.8%.'
    },
    {
      q: 'What are the 5 core CRO techniques tested in this project?',
      a: '1) Prominent, action-oriented CTA ("Enroll Now – Save 60%" vs generic "Learn More"); 2) Benefit-driven Headline ("Build Real-World Web Apps and Become Job Ready"); 3) Friction Reduction through Form Simplification (3 essential fields vs 6 fields); 4) Visual Social Proof & Ratings (student testimonials with stars); 5) Psychological Pricing Anchoring (₹4,999 crossed out to ₹1,999 with 60% discount badge).'
    },
    {
      q: 'Why did Variant B perform better than Variant A?',
      a: 'Variant B addressed both motivation and friction in Fogg’s Behavior Model (B=MAP). High visual contrast and discount anchoring increased visitor motivation, while removing unnecessary form fields dramatically lowered friction, resulting in a higher completion rate.'
    },
    {
      q: 'How does A/B testing prevent bias?',
      a: 'Incoming visitors are randomly split 50/50 between Variant A and Variant B in real time. Session persistence ensures a user does not oscillate between variations, maintaining experimental control.'
    }
  ];

  return (
    <div className="viva-card">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BookOpen size={22} color="#2563eb" />
          <h3 style={{ fontSize: '1.25rem' }}>Academic Viva &amp; Oral Defense Study Guide</h3>
        </div>
        <button type="button" style={{ color: '#2563eb' }}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
        Key marketing concepts, formulas, and answers to prepare for project viva evaluation.
      </p>

      {isOpen && (
        <div className="viva-content">
          {qaList.map((item, index) => (
            <div key={index} className="viva-qa">
              <h4>Q{index + 1}: {item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
