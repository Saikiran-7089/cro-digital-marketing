import React from 'react';

export default function CourseCurriculum() {
  const modules = [
    {
      num: '01',
      title: 'HTML5 & Modern CSS3',
      desc: 'Semantic structure, Flexbox, CSS Grid, media queries, accessibility, and modern responsive layouts.'
    },
    {
      num: '02',
      title: 'Modern JavaScript (ES6+)',
      desc: 'DOM manipulation, asynchronous JavaScript, Promises, Fetch API, closures, and modular code architecture.'
    },
    {
      num: '03',
      title: 'React.js & State Management',
      desc: 'Components, hooks (useState, useEffect, custom hooks), component lifecycle, and dynamic UI rendering.'
    },
    {
      num: '04',
      title: 'Node.js & Express REST APIs',
      desc: 'Backend routing, middleware, controllers, JWT authentication, and structured API endpoints.'
    },
    {
      num: '05',
      title: 'MongoDB & Database Design',
      desc: 'Document modeling, schemas, CRUD operations, indexing, and data persistence with Mongoose.'
    },
    {
      num: '06',
      title: 'Real-World Capstone Project',
      desc: 'Build, test, and deploy a complete production-ready full-stack web application with user authentication.'
    }
  ];

  return (
    <section id="curriculum" className="section" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Comprehensive Syllabus</p>
          <h2 className="section-title">What You Will Learn</h2>
          <p className="section-desc">
            A step-by-step roadmap from coding fundamentals to full-stack application development.
          </p>
        </div>

        <div className="curriculum-grid">
          {modules.map((m) => (
            <div key={m.num} className="tech-card">
              <div className="tech-badge-num">{m.num}</div>
              <div className="tech-info">
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
