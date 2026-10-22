import React from 'react';
import { Sparkles, ArrowRight, Activity, BarChart2 } from 'lucide-react';

export default function VariantSwitcherBar({ variant, switchVariant, currentPage, onNavigate }) {
  return (
    <aside className="evaluator-bar" aria-label="A/B Testing Control Bar">
      <div className="evaluator-bar-inner">
        <div className="evaluator-tag">
          <Activity size={16} className="text-blue-400" />
          <span>CRO Academic Lab:</span>
          <span className="evaluator-badge">
            {variant === 'B' ? 'Variant B (Optimized)' : 'Variant A (Original Baseline)'}
          </span>
        </div>

        <div className="evaluator-actions">
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>A/B Switcher:</span>
          <button
            type="button"
            className={`btn-toggle-variant ${variant === 'A' ? 'active' : ''}`}
            onClick={() => switchVariant('A')}
            title="Switch to Original Landing Page (Low CRO, High Friction)"
          >
            Variant A (Original)
          </button>
          <button
            type="button"
            className={`btn-toggle-variant ${variant === 'B' ? 'active' : ''}`}
            onClick={() => switchVariant('B')}
            title="Switch to Optimized Landing Page (High CRO, Low Friction)"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={13} /> Variant B (Optimized)
            </span>
          </button>

          {currentPage === 'landing' ? (
            <button
              type="button"
              className="btn-dashboard-link"
              onClick={() => onNavigate('dashboard')}
              title="Open the real-time Conversion Rate Analytics Dashboard"
            >
              <BarChart2 size={14} /> View CRO Dashboard <ArrowRight size={13} />
            </button>
          ) : (
            <button
              type="button"
              className="btn-dashboard-link"
              onClick={() => onNavigate('landing')}
              title="Back to Landing Page"
            >
              ← Back to Landing Page
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
