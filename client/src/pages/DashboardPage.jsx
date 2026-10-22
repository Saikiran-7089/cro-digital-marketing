import React, { useState, useEffect, useCallback } from 'react';
import { Users, MousePointer, Award, Percent, RefreshCw, Database, Trash2, ArrowLeft } from 'lucide-react';
import { getOverallAnalytics, getVariantAnalytics, seedDemoData, resetAnalyticsData } from '../services/api';
import KpiCard from '../components/Analytics/KpiCard';
import AbComparisonTable from '../components/Analytics/AbComparisonTable';
import VisitorsConversionsChart from '../components/Analytics/VisitorsConversionsChart';
import VariantComparisonChart from '../components/Analytics/VariantComparisonChart';
import FunnelDropoffChart from '../components/Analytics/FunnelDropoffChart';
import InsightsCard from '../components/Analytics/InsightsCard';
import VivaCheatSheet from '../components/Analytics/VivaCheatSheet';

export default function DashboardPage({ onNavigate }) {
  const [overall, setOverall] = useState(null);
  const [variants, setVariants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [overallRes, variantsRes] = await Promise.all([
        getOverallAnalytics(),
        getVariantAnalytics()
      ]);

      if (overallRes.success) setOverall(overallRes.data);
      if (variantsRes.success) setVariants(variantsRes.data);
    } catch (err) {
      console.error('[Dashboard] Error fetching analytics:', err);
      setError(err.message || 'Failed to load analytics from server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSeed = async () => {
    try {
      setActionLoading(true);
      const res = await seedDemoData();
      setStatusMessage(res.message || 'Demo data loaded successfully!');
      await loadData();
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert('Failed to seed demo data: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all tracked events and conversions to 0?')) {
      return;
    }
    try {
      setActionLoading(true);
      const res = await resetAnalyticsData();
      setStatusMessage(res.message || 'Analytics reset to 0!');
      await loadData();
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert('Failed to reset data: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-title-box">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#2563eb', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}
          >
            <ArrowLeft size={16} /> Return to Course Landing Page
          </button>
          <h1>CRO Analytics &amp; A/B Testing Dashboard</h1>
          <p className="dashboard-subtitle">
            Measurable Conversion Rate Optimization results calculated dynamically from backend SQLite database
          </p>
        </div>

        <div className="dashboard-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={loadData}
            disabled={loading}
            title="Refresh analytics data"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem' }}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="btn-action-seed"
            onClick={handleSeed}
            disabled={actionLoading}
            title="Populate 250 realistic demo visitors for college presentation"
          >
            <Database size={15} />
            <span>Load Demo Data</span>
          </button>

          <button
            type="button"
            className="btn-action-reset"
            onClick={handleReset}
            disabled={actionLoading}
            title="Clear all events to test live interactions from zero"
          >
            <Trash2 size={15} />
            <span>Reset to 0</span>
          </button>
        </div>
      </header>

      {statusMessage && (
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
          ✓ {statusMessage}
        </div>
      )}

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <strong>Error connecting to analytics backend:</strong> {error}.
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            Ensure backend server is running on port 5000 (`cd server &amp;&amp; npm start`).
          </div>
        </div>
      )}

      {/* KPI Summary Cards */}
      <section className="kpi-grid" aria-label="Key Performance Indicators">
        <KpiCard
          title="Total Visitors"
          value={overall ? overall.totalVisitors : '...'}
          subtext="Unique sessions tracked across landing page"
          icon={<Users size={22} />}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />

        <KpiCard
          title="CTA Clicks"
          value={overall ? overall.totalCtaClicks : '...'}
          subtext={`Overall Click-Through Rate: ${overall ? overall.overallCtr : 0}%`}
          icon={<MousePointer size={22} />}
          iconBg="#f5f3ff"
          iconColor="#7c3aed"
        />

        <KpiCard
          title="Total Conversions"
          value={overall ? overall.totalConversions : '...'}
          subtext="Completed course registrations"
          icon={<Award size={22} />}
          iconBg="#ecfdf5"
          iconColor="#10b981"
        />

        <KpiCard
          title="Overall Conversion Rate"
          value={overall ? `${overall.overallConversionRate}%` : '...'}
          subtext="Formula: (Conversions ÷ Visitors) × 100"
          icon={<Percent size={22} />}
          iconBg="#fffbeb"
          iconColor="#f59e0b"
        />
      </section>

      {/* A/B Comparison Table */}
      {variants && (
        <AbComparisonTable
          variantData={variants}
          summary={variants.summary}
        />
      )}

      {/* Charts Section */}
      {variants && (
        <div className="charts-grid">
          <VisitorsConversionsChart
            variantA={variants.variantA}
            variantB={variants.variantB}
          />

          <VariantComparisonChart
            variantA={variants.variantA}
            variantB={variants.variantB}
            relativeLift={variants.summary?.relativeLift || 0}
          />

          <FunnelDropoffChart
            variantA={variants.variantA}
            variantB={variants.variantB}
          />
        </div>
      )}

      {/* Dynamic CRO Insights */}
      {variants && (
        <InsightsCard insights={variants.insights} />
      )}

      {/* Viva Preparation Guide */}
      <VivaCheatSheet />
    </div>
  );
}
