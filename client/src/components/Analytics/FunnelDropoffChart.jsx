import React from 'react';

export default function FunnelDropoffChart({ variantA, variantB }) {
  const vaVisitors = variantA?.visitors || 0;
  const vaClicks = variantA?.ctaClicks || 0;
  const vaConv = variantA?.conversions || 0;

  const vbVisitors = variantB?.visitors || 0;
  const vbClicks = variantB?.ctaClicks || 0;
  const vbConv = variantB?.conversions || 0;

  const stages = [
    {
      title: '1. Landing Page Visitors',
      countA: vaVisitors,
      pctA: vaVisitors > 0 ? '100%' : '0%',
      countB: vbVisitors,
      pctB: vbVisitors > 0 ? '100%' : '0%'
    },
    {
      title: '2. Primary CTA Clicked',
      countA: vaClicks,
      pctA: vaVisitors > 0 ? `${((vaClicks / vaVisitors) * 100).toFixed(1)}%` : '0%',
      countB: vbClicks,
      pctB: vbVisitors > 0 ? `${((vbClicks / vbVisitors) * 100).toFixed(1)}%` : '0%'
    },
    {
      title: '3. Form Registration Completed',
      countA: vaConv,
      pctA: vaVisitors > 0 ? `${((vaConv / vaVisitors) * 100).toFixed(1)}%` : '0%',
      countB: vbConv,
      pctB: vbVisitors > 0 ? `${((vbConv / vbVisitors) * 100).toFixed(1)}%` : '0%'
    }
  ];

  return (
    <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
      <div className="chart-header">
        <h3>Chart 3: Conversion Funnel &amp; CTA Click-Through</h3>
        <p>Step-by-step visitor progression and drop-off analysis through the conversion funnel</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {stages.map((stage, idx) => (
          <div
            key={idx}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem'
            }}
          >
            <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.85rem' }}>
              {stage.title}
            </h4>

            {/* Variant A Mini Bar */}
            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.25rem' }}>
                <span style={{ color: '#475569' }}>Variant A (Baseline)</span>
                <strong>{stage.countA} ({stage.pctA})</strong>
              </div>
              <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: stage.pctA,
                    background: '#94a3b8',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>

            {/* Variant B Mini Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.25rem' }}>
                <span style={{ color: '#1d4ed8', fontWeight: 600 }}>Variant B (Optimized)</span>
                <strong style={{ color: '#047857' }}>{stage.countB} ({stage.pctB})</strong>
              </div>
              <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: stage.pctB,
                    background: '#2563eb',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
