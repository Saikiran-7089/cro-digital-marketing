import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

export default function AbComparisonTable({ variantData, summary }) {
  if (!variantData) return null;

  const { variantA, variantB } = variantData;

  const rows = [
    {
      metric: 'Unique Visitors (Sample Size)',
      va: variantA.visitors,
      vb: variantB.visitors,
      lift: variantB.visitors - variantA.visitors >= 0 ? `+${variantB.visitors - variantA.visitors}` : `${variantB.visitors - variantA.visitors}`,
      isHigherB: variantB.visitors >= variantA.visitors
    },
    {
      metric: 'CTA Clicks',
      va: variantA.ctaClicks,
      vb: variantB.ctaClicks,
      lift: variantB.ctaClicks - variantA.ctaClicks >= 0 ? `+${variantB.ctaClicks - variantA.ctaClicks}` : `${variantB.ctaClicks - variantA.ctaClicks}`,
      isHigherB: variantB.ctaClicks >= variantA.ctaClicks
    },
    {
      metric: 'Click-Through Rate (CTR %)',
      va: `${variantA.ctr}%`,
      vb: `${variantB.ctr}%`,
      lift: `${(variantB.ctr - variantA.ctr).toFixed(2)}%`,
      isHigherB: variantB.ctr >= variantA.ctr
    },
    {
      metric: 'Form Conversions (Registrations)',
      va: variantA.conversions,
      vb: variantB.conversions,
      lift: variantB.conversions - variantA.conversions >= 0 ? `+${variantB.conversions - variantA.conversions}` : `${variantB.conversions - variantA.conversions}`,
      isHigherB: variantB.conversions >= variantA.conversions
    },
    {
      metric: 'Conversion Rate (CR %)',
      va: `${variantA.conversionRate}%`,
      vb: `${variantB.conversionRate}%`,
      lift: summary?.relativeLift ? `+${summary.relativeLift}% relative lift` : `${(variantB.conversionRate - variantA.conversionRate).toFixed(2)}%`,
      isHigherB: variantB.conversionRate >= variantA.conversionRate,
      isPrimary: true
    }
  ];

  return (
    <div className="comparison-card">
      <div className="card-title-bar">
        <div>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>
            A/B Variant Performance Comparison
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Direct statistical comparison between Baseline (Variant A) and CRO-Optimized (Variant B)
          </p>
        </div>

        {summary?.winningVariant && (
          <div className="winning-banner">
            <Trophy size={18} color="#059669" />
            <span>Winning Variant: {summary.winningVariant}</span>
            {summary.relativeLift > 0 && (
              <span className="badge-winner">+{summary.relativeLift}% Lift</span>
            )}
          </div>
        )}
      </div>

      <div className="table-responsive">
        <table className="cro-table" aria-label="A/B Testing Comparison Table">
          <thead>
            <tr>
              <th scope="col" style={{ width: '38%' }}>Metric</th>
              <th scope="col">Variant A (Original)</th>
              <th scope="col">Variant B (Optimized)</th>
              <th scope="col">Performance Difference</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr 
                key={index} 
                style={row.isPrimary ? { background: '#f8fafc', fontWeight: 600 } : {}}
              >
                <td>
                  <strong>{row.metric}</strong>
                  {row.isPrimary && (
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>
                      Formula: (Conversions ÷ Visitors) × 100
                    </span>
                  )}
                </td>
                <td>
                  <span style={{ fontSize: row.isPrimary ? '1.1rem' : '0.95rem' }}>{row.va}</span>
                </td>
                <td>
                  <span 
                    style={{ 
                      fontSize: row.isPrimary ? '1.15rem' : '0.95rem',
                      fontWeight: 700, 
                      color: row.isHigherB ? '#047857' : '#0f172a' 
                    }}
                  >
                    {row.vb}
                  </span>
                  {row.isPrimary && summary?.winningVariant?.includes('Variant B') && (
                    <span className="badge-winner">WINNER</span>
                  )}
                </td>
                <td>
                  <span className={row.isHigherB ? 'positive-lift' : ''}>
                    {row.lift}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
