import React from 'react';

export default function VisitorsConversionsChart({ variantA, variantB }) {
  const vaVisitors = variantA?.visitors || 0;
  const vbVisitors = variantB?.visitors || 0;
  const vaConversions = variantA?.conversions || 0;
  const vbConversions = variantB?.conversions || 0;

  const maxVal = Math.max(vaVisitors, vbVisitors, vaConversions, vbConversions, 10);

  // SVG dimensions
  const svgWidth = 480;
  const svgHeight = 220;
  const chartHeight = 150;
  const chartBottom = 170;

  // Scale function
  const scale = (val) => (val / maxVal) * chartHeight;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Chart 1: Visitors vs Conversions</h3>
        <p>Total audience reach versus successful course enrollments</p>
      </div>

      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="bar-chart-svg">
        {/* Y-axis grid lines */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = chartBottom - pct * chartHeight;
          const val = Math.round(pct * maxVal);
          return (
            <g key={i}>
              <line x1="45" y1={y} x2={svgWidth - 20} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
              <text x="38" y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {/* Group A: Variant A (Baseline) */}
        {/* Visitors bar */}
        <rect
          x="90"
          y={chartBottom - scale(vaVisitors)}
          width="40"
          height={Math.max(scale(vaVisitors), 2)}
          rx="4"
          fill="#94a3b8"
        />
        <text
          x="110"
          y={chartBottom - scale(vaVisitors) - 6}
          fill="#475569"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
        >
          {vaVisitors}
        </text>

        {/* Conversions bar */}
        <rect
          x="138"
          y={chartBottom - scale(vaConversions)}
          width="40"
          height={Math.max(scale(vaConversions), 2)}
          rx="4"
          fill="#475569"
        />
        <text
          x="158"
          y={chartBottom - scale(vaConversions) - 6}
          fill="#1e293b"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
        >
          {vaConversions}
        </text>

        <text x="134" y="194" fill="#334155" fontSize="12" fontWeight="bold" textAnchor="middle">
          Variant A (Original)
        </text>

        {/* Group B: Variant B (Optimized) */}
        {/* Visitors bar */}
        <rect
          x="280"
          y={chartBottom - scale(vbVisitors)}
          width="40"
          height={Math.max(scale(vbVisitors), 2)}
          rx="4"
          fill="#60a5fa"
        />
        <text
          x="300"
          y={chartBottom - scale(vbVisitors) - 6}
          fill="#2563eb"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
        >
          {vbVisitors}
        </text>

        {/* Conversions bar */}
        <rect
          x="328"
          y={chartBottom - scale(vbConversions)}
          width="40"
          height={Math.max(scale(vbConversions), 2)}
          rx="4"
          fill="#2563eb"
        />
        <text
          x="348"
          y={chartBottom - scale(vbConversions) - 6}
          fill="#1d4ed8"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
        >
          {vbConversions}
        </text>

        <text x="324" y="194" fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="middle">
          Variant B (Optimized)
        </text>
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#60a5fa', display: 'inline-block' }}></span>
          <span>Visitors</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#2563eb', display: 'inline-block' }}></span>
          <span>Conversions (Enrolled)</span>
        </div>
      </div>
    </div>
  );
}
