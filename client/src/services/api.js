/**
 * API Service for CRO Lab
 * Communicates with backend Express server (proxied via Vite on /api)
 */

const BASE_URL = '/api';

/**
 * Record an interaction event (page_view, cta_click, form_start)
 */
export async function recordEvent({ sessionId, variant, eventType, ctaName = 'General' }) {
  try {
    const res = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, variant, eventType, ctaName })
    });
    return await res.json();
  } catch (error) {
    console.warn('[CRO Tracker] Failed to record event:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Submit course registration conversion
 */
export async function recordConversion(formData) {
  try {
    const res = await fetch(`${BASE_URL}/conversions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch overall KPI metrics
 */
export async function getOverallAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch overall analytics');
  return await res.json();
}

/**
 * Fetch A/B variant comparison analytics
 */
export async function getVariantAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics/variants`);
  if (!res.ok) throw new Error('Failed to fetch variant analytics');
  return await res.json();
}

/**
 * Fetch conversion funnel metrics
 */
export async function getFunnelAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics/funnel`);
  if (!res.ok) throw new Error('Failed to fetch funnel analytics');
  return await res.json();
}

/**
 * Fetch recent registrations list
 */
export async function getRecentConversions() {
  const res = await fetch(`${BASE_URL}/conversions`);
  if (!res.ok) throw new Error('Failed to fetch recent conversions');
  return await res.json();
}

/**
 * Populate demo seed data
 */
export async function seedDemoData() {
  const res = await fetch(`${BASE_URL}/analytics/seed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Failed to seed demo data');
  return await res.json();
}

/**
 * Reset all analytics data to 0
 */
export async function resetAnalyticsData() {
  const res = await fetch(`${BASE_URL}/analytics/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Failed to reset analytics');
  return await res.json();
}
