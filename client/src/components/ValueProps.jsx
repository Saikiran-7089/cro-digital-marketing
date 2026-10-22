import React from 'react';
import { Layers, Cpu, Compass, Award } from 'lucide-react';

export default function ValueProps({ variant }) {
  const benefits = [
    {
      icon: <Layers size={26} />,
      iconClass: 'icon-blue',
      title: 'Project-Based Learning',
      desc: 'Build 10 real-world applications instead of memorizing abstract theory. Gain portfolio-ready projects.'
    },
    {
      icon: <Cpu size={26} />,
      iconClass: 'icon-purple',
      title: 'Industry-Relevant Tech',
      desc: 'Master the high-demand MERN stack (MongoDB, Express, React, Node.js) currently sought by employers.'
    },
    {
      icon: <Compass size={26} />,
      iconClass: 'icon-green',
      title: 'Beginner-Friendly Lessons',
      desc: 'Step-by-step modular progression starting from fundamentals up to scalable full-stack web architectures.'
    },
    {
      icon: <Award size={26} />,
      iconClass: 'icon-amber',
      title: 'Certificate of Completion',
      desc: 'Earn an academic digital certificate upon finishing all projects and coding milestones.'
    }
  ];

  return (
    <section id="benefits" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">
            {variant === 'B' ? 'Why SkillBoost Stands Out' : 'Course Benefits'}
          </p>
          <h2 className="section-title">
            {variant === 'B'
              ? 'Designed Specifically for Fast Skill Mastery'
              : 'What You Will Receive'}
          </h2>
          <p className="section-desc">
            {variant === 'B'
              ? 'Our curriculum focuses purely on practical implementation so you spend 80% of your time writing real code.'
              : 'A structured curriculum covering standard web development concepts for students.'}
          </p>
        </div>

        <div className="value-grid">
          {benefits.map((b, i) => (
            <div key={i} className="value-card">
              <div className={`value-icon-box ${b.iconClass}`}>
                {b.icon}
              </div>
              <h3 className="value-title">{b.title}</h3>
              <p className="value-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
