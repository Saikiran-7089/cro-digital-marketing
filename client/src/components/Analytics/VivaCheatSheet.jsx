import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

export default function VivaCheatSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const qaList = [
    {
      q: 'What is Conversion Rate Optimization (CRO)?',
      a: 'CRO is the systematic, data-driven marketing process of improving website design, copywriting, page architecture, and user experience to increase the percentage of visitors who complete a desired macro or micro action without necessarily increasing total traffic.'
    },
    {
      q: 'What is A/B testing?',
      a: 'A/B testing is a controlled marketing experiment where two or more versions of a page (Variant A: Control, Variant B: Challenger) are shown simultaneously to randomly partitioned segments of visitors to measure which version yields a superior conversion rate.'
    },
    {
      q: 'Why use two variants (Variant A vs. Variant B)?',
      a: 'Using two variants provides an experimental baseline. Variant A represents the conventional baseline design with lower contrast and a longer friction-heavy form, while Variant B tests CRO hypotheses (simplified form, prominent CTA, social proof, price anchoring).'
    },
    {
      q: 'What is Conversion Rate (CR) and how is it calculated?',
      a: 'Conversion Rate = (Total Conversions ÷ Total Unique Visitors) × 100. For example, 32 conversions from 250 visitors = 12.80%. If visitors = 0, our backend safely returns 0.0% to prevent division-by-zero errors.'
    },
    {
      q: 'What is Click-Through Rate (CTR) and how does it differ from Conversion Rate?',
      a: 'CTR = (CTA Clicks ÷ Total Visitors) × 100. CTR measures micro-engagement (intent to enroll), whereas Conversion Rate measures macro-completion (successful registration form submission).'
    },
    {
      q: 'What is Relative Lift and how is it calculated?',
      a: 'Relative Lift = ((CR_B - CR_A) ÷ CR_A) × 100. For example, with Variant A at 7.2% and Variant B at 12.8%, Relative Lift is ((12.8 - 7.2) / 7.2) * 100 ≈ +77.8%.'
    },
    {
      q: 'Why reduce form fields in Variant B?',
      a: 'According to Hick’s Law and cognitive friction research, every extra form field adds user input fatigue and privacy hesitation. Reducing the form from 6 fields to 3 essential fields (Name, Email, Phone) removes friction and boosts completion.'
    },
    {
      q: 'Why use a strong, benefit-driven Call-to-Action (CTA)?',
      a: 'A generic CTA like "Learn More" is passive. An action-oriented, value-infused CTA like "Enroll Now – Save 60%" creates clarity, highlights immediate economic benefit, and provides a clear prompt under Fogg’s Behavior Model (B=MAP).'
    },
    {
      q: 'What is social proof and how is it implemented?',
      a: 'Social proof is the psychological tendency to follow others’ validated actions. In Variant B, we display 5-star ratings, student avatars, and specific project outcomes ("Built a SaaS app in Week 6") to establish trust.'
    },
    {
      q: 'What is price anchoring in CRO?',
      a: 'Price anchoring is a cognitive bias where the original price serves as a reference anchor. Showing ₹4,999 crossed out alongside ₹1,999 with a "60% OFF" badge anchors high perceived value and highlights clear savings.'
    },
    {
      q: 'How is visitor traffic split between variants?',
      a: 'Incoming visitors are assigned to Variant A or Variant B through a 50/50 pseudo-random split and persisted in localStorage with a unique session ID to prevent variant flickering on refresh.'
    },
    {
      q: 'How and where is the data stored?',
      a: 'All events and conversions are stored in a local SQLite relational database (cro_database.sqlite) with indexed events and conversions tables.'
    },
    {
      q: 'How are conversions tracked in real time?',
      a: 'The frontend sends POST /api/events for page_view and cta_click, and POST /api/conversions for registrations. The backend records and aggregates these raw database rows dynamically.'
    },
    {
      q: 'Why was SQLite selected for this student project?',
      a: 'SQLite is serverless, zero-configuration, and file-based. It requires no background database server or cloud credentials, allowing the project to run reliably on any student laptop.'
    },
    {
      q: 'What are the limitations of this academic experiment?',
      a: 'In commercial enterprise environments, experiments must account for traffic channel segmentation (organic vs paid), day-of-week seasonality, and formal statistical significance (p < 0.05, 95% confidence intervals).'
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
          <h3 style={{ fontSize: '1.25rem' }}>Academic Viva &amp; Oral Defense Study Guide (15 Key Q&amp;As)</h3>
        </div>
        <button type="button" style={{ color: '#2563eb' }}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
        Click to expand comprehensive marketing concepts, mathematical formulas, and answers to prepare for project viva evaluation.
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
