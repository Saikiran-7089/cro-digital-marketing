import React from 'react';
import { Lightbulb, CheckCircle2, MousePointerClick, FileText, Info } from 'lucide-react';

export default function InsightsCard({ insights }) {
  if (!insights || insights.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} color="#10b981" />;
      case 'cta':
        return <MousePointerClick size={20} color="#2563eb" />;
      case 'form':
        return <FileText size={20} color="#f59e0b" />;
      default:
        return <Info size={20} color="#64748b" />;
    }
  };

  const getStyleClass = (type) => {
    switch (type) {
      case 'success':
        return 'insight-success';
      case 'cta':
        return 'insight-cta';
      case 'form':
        return 'insight-form';
      default:
        return 'insight-info';
    }
  };

  return (
    <div className="insights-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Lightbulb size={24} color="#f59e0b" />
        <h2 style={{ fontSize: '1.35rem' }}>Automated CRO Insights &amp; Findings</h2>
      </div>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
        Heuristic marketing analysis generated directly from active visitor engagement data
      </p>

      <div className="insights-list">
        {insights.map((item, index) => (
          <div key={index} className={`insight-item ${getStyleClass(item.type)}`}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ marginTop: '2px' }}>{getIcon(item.type)}</div>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.925rem', lineHeight: 1.55 }}>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
