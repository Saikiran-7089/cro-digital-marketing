import React from 'react';

export default function KpiCard({ title, value, subtext, icon, iconBg = '#eff6ff', iconColor = '#2563eb' }) {
  return (
    <div className="kpi-card">
      <div>
        <p className="kpi-title">{title}</p>
        <p className="kpi-value">{value}</p>
        {subtext && <p className="kpi-subtext">{subtext}</p>}
      </div>
      <div className="kpi-icon-box" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
    </div>
  );
}
