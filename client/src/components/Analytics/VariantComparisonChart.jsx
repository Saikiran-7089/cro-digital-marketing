import React from 'react';

export default function VariantComparisonChart({ variantA, variantB, relativeLift }) {
  const crA = Number(variantA?.conversionRate || 0);
  const crB = Number(variantB?.conversionRate || 0);

  const maxRate = Math.max(crA, crB, 15);

  const svgWidth = 480;
  const svgHeight = 220;
  const barMaxLen = 280;

  const getBarLen = (rate) => (rate / maxRate) * barMaxLen;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Chart 2: Variant A vs Variant B Conversion Rate</h3>
        <p>Percentage of visitors who completed course registration</p>
      </div>

      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="bar-chart-svg">
        {/* Background baseline */}
        <line x1="120" y1="20" x2="120" y2="170" stroke="#cbd5e1" strokeWidth="2" />

        {/* Row 1: Variant A */}
        <text x="110" y="65" fill="#475569" fontSize="12" fontWeight="600" textAnchor="end">
          Variant A
        </text>
        <rect
          x="122"
          y="45"
          width={Math.max(getBarLen(crA), 4)}
          height="32"
          rx="6"
          fill="#94a3b8"
        />
        <text
          x={130 + Math.max(getBarLen(crA), 4)}
          y="66"
          fill="#0f172a"
          fontSize="13"
          fontWeight="bold"
        >
          {crA}%
        </text>

        {/* Row 2: Variant B */}
        <text x="110" y="135" fill="#1d4ed8" fontSize="12" fontWeight="700" textAnchor="end">
          Variant B
        </text>
        <rect
          x="122"
          y="115"
          width={Math.max(getBarLen(crB), 4)}
          height="32"
          rx="6"
          fill="#10b981"
        />
        <text
          x={130 + Math.max(getBarLen(crB), 4)}
          y="136"
          fill="#047857"
          fontSize="14"
          fontWeight="bold"
        >
          {crB}%
        </text>

        {/* Relative Lift Callout */}
        {crB > crA && (
          <g>
            <rect x="330" y="112" width="130" height="36" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="395" y="134" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">
              +{relativeLift}% Relative Lift
            </text>
          </g>
        )}

        {/* X-axis ticks */}
        <line x1="120" y1="170" x2="440" y2="170" stroke="#cbd5e1" strokeWidth="1" />
        {[0, 5, 10, 15].map((val) => {
          const x = 120 + (val / maxRate) * barMaxLen;
          if (x > 440) return null;
          return (
            <g key={val}>
              <line x1={x} y1="170" x2={x} y2="176" stroke="#94a3b8" />
              <text x={x} y="190" fill="#94a3b8" fontSize="10" textAnchor="middle">{val}%</text>
            </g>
          );
        })}
      </svg>

      <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
        Conversion Rate Formula: <code>(Conversions ÷ Total Visitors) × 100</code>
      </div>
    </div>
  );
}
