const db = require('../config/db');

/**
 * Helper: Safely calculate percentage with 2 decimal precision
 */
function safePercentage(numerator, denominator) {
  if (!denominator || denominator <= 0) return 0.0;
  return Number(((numerator / denominator) * 100).toFixed(2));
}

/**
 * Get Overall Analytics
 * GET /api/analytics
 */
exports.getOverallAnalytics = (req, res) => {
  try {
    // Unique visitors by session_id who viewed the page
    const visitorsStmt = db.prepare(`
      SELECT COUNT(DISTINCT session_id) as count 
      FROM events 
      WHERE event_type = 'page_view'
    `);
    const visitorsResult = visitorsStmt.get();
    const totalVisitors = visitorsResult ? visitorsResult.count : 0;

    // Total page views
    const pageViewsStmt = db.prepare(`
      SELECT COUNT(*) as count FROM events WHERE event_type = 'page_view'
    `);
    const totalPageViews = (pageViewsStmt.get() || {}).count || 0;

    // Total CTA clicks
    const ctaStmt = db.prepare(`
      SELECT COUNT(*) as count FROM events WHERE event_type = 'cta_click'
    `);
    const totalCtaClicks = (ctaStmt.get() || {}).count || 0;

    // Total conversions
    const convStmt = db.prepare(`
      SELECT COUNT(*) as count FROM conversions
    `);
    const totalConversions = (convStmt.get() || {}).count || 0;

    const overallConversionRate = safePercentage(totalConversions, totalVisitors);
    const overallCtr = safePercentage(totalCtaClicks, totalVisitors);

    return res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        totalPageViews,
        totalCtaClicks,
        totalConversions,
        overallConversionRate,
        overallCtr,
        formula: 'Conversion Rate = (Conversions / Visitors) × 100'
      }
    });
  } catch (error) {
    console.error('[Error] getOverallAnalytics:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to compute overall analytics',
      details: error.message
    });
  }
};

/**
 * Get A/B Variant Comparison Analytics
 * GET /api/analytics/variants
 */
exports.getVariantAnalytics = (req, res) => {
  try {
    // Helper to fetch metrics for a given variant
    const getMetrics = (variant) => {
      const visitors = (db.prepare(`
        SELECT COUNT(DISTINCT session_id) as count 
        FROM events 
        WHERE variant = ? AND event_type = 'page_view'
      `).get(variant) || {}).count || 0;

      const ctaClicks = (db.prepare(`
        SELECT COUNT(*) as count 
        FROM events 
        WHERE variant = ? AND event_type = 'cta_click'
      `).get(variant) || {}).count || 0;

      const conversions = (db.prepare(`
        SELECT COUNT(*) as count 
        FROM conversions 
        WHERE variant = ?
      `).get(variant) || {}).count || 0;

      const ctr = safePercentage(ctaClicks, visitors);
      const conversionRate = safePercentage(conversions, visitors);

      return {
        variant,
        visitors,
        ctaClicks,
        conversions,
        ctr,
        conversionRate
      };
    };

    const variantA = getMetrics('A');
    const variantB = getMetrics('B');

    // Determine Winning Variant
    let winningVariant = 'No Winner Yet';
    let relativeLift = 0.0;
    let absoluteLift = Number((variantB.conversionRate - variantA.conversionRate).toFixed(2));

    if (variantB.conversionRate > variantA.conversionRate) {
      winningVariant = 'Variant B (Optimized)';
      if (variantA.conversionRate > 0) {
        relativeLift = Number((((variantB.conversionRate - variantA.conversionRate) / variantA.conversionRate) * 100).toFixed(1));
      } else {
        relativeLift = 100.0;
      }
    } else if (variantA.conversionRate > variantB.conversionRate) {
      winningVariant = 'Variant A (Original)';
      if (variantB.conversionRate > 0) {
        relativeLift = Number((((variantA.conversionRate - variantB.conversionRate) / variantB.conversionRate) * 100).toFixed(1));
      } else {
        relativeLift = 100.0;
      }
    } else if (variantA.visitors > 0 && variantB.visitors > 0 && variantA.conversionRate === variantB.conversionRate) {
      winningVariant = 'Tied';
    }

    // Dynamic Academic Insights Generator
    let insights = [];
    if (variantA.visitors === 0 && variantB.visitors === 0) {
      insights.push({
        type: 'info',
        title: 'Awaiting Visitor Traffic',
        description: 'No visitors recorded yet. Test both variants from the landing page or load demo data to analyze CRO metrics.'
      });
    } else {
      if (variantB.conversionRate > variantA.conversionRate) {
        insights.push({
          type: 'success',
          title: 'Variant B Outperforming Baseline',
          description: `Variant B currently shows a ${relativeLift > 0 ? `+${relativeLift}%` : ''} relative lift in conversion rate over Variant A (${variantB.conversionRate}% vs ${variantA.conversionRate}%).`
        });
      } else if (variantA.conversionRate > variantB.conversionRate) {
        insights.push({
          type: 'warning',
          title: 'Variant A Leading',
          description: `Variant A is currently ahead (${variantA.conversionRate}% vs ${variantB.conversionRate}%). More traffic is recommended to reach statistical significance.`
        });
      }

      // CTA Click-through analysis
      if (variantB.ctr > variantA.ctr) {
        insights.push({
          type: 'cta',
          title: 'Prominent CTA Drives Higher Engagement',
          description: `Variant B achieved a ${variantB.ctr}% CTR compared to ${variantA.ctr}% for Variant A. The prominent "Enroll Now" button with contrasting color and urgency badge ("Save 60%") clearly reduced user hesitation.`
        });
      }

      // Form Friction analysis
      insights.push({
        type: 'form',
        title: 'Form Length Friction Impact',
        description: 'Variant B uses a simplified 3-field form (Name, Email, Phone), whereas Variant A requires 6 fields. Eliminating non-essential fields significantly reduces cognitive load and drop-off rate.'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        variantA: {
          name: 'Variant A (Original)',
          description: 'Baseline: Standard headline, "Learn More" CTA, long registration form (6 fields), lower social proof prominence.',
          ...variantA
        },
        variantB: {
          name: 'Variant B (Optimized)',
          description: 'CRO Optimized: Benefit-driven headline, "Enroll Now" high-contrast CTA, 3-field simplified form, prominent testimonials, discount anchor (₹4,999 -> ₹1,999).',
          ...variantB
        },
        summary: {
          winningVariant,
          relativeLift,
          absoluteLift,
          sampleSizeA: variantA.visitors,
          sampleSizeB: variantB.visitors,
          totalTested: variantA.visitors + variantB.visitors
        },
        insights
      }
    });
  } catch (error) {
    console.error('[Error] getVariantAnalytics:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to compute variant comparison analytics',
      details: error.message
    });
  }
};

/**
 * Get Funnel Analytics
 * GET /api/analytics/funnel
 */
exports.getFunnelAnalytics = (req, res) => {
  try {
    const getFunnel = (variant) => {
      const visitors = (db.prepare(`
        SELECT COUNT(DISTINCT session_id) as count 
        FROM events 
        WHERE variant = ? AND event_type = 'page_view'
      `).get(variant) || {}).count || 0;

      const ctaClicks = (db.prepare(`
        SELECT COUNT(*) as count 
        FROM events 
        WHERE variant = ? AND event_type = 'cta_click'
      `).get(variant) || {}).count || 0;

      const conversions = (db.prepare(`
        SELECT COUNT(*) as count 
        FROM conversions 
        WHERE variant = ?
      `).get(variant) || {}).count || 0;

      return [
        { stage: '1. Page Visitors', count: visitors, percentage: 100 },
        { stage: '2. CTA Clicks', count: ctaClicks, percentage: safePercentage(ctaClicks, visitors) },
        { stage: '3. Conversions', count: conversions, percentage: safePercentage(conversions, visitors) }
      ];
    };

    return res.status(200).json({
      success: true,
      data: {
        variantA: getFunnel('A'),
        variantB: getFunnel('B')
      }
    });
  } catch (error) {
    console.error('[Error] getFunnelAnalytics:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to compute funnel analytics'
    });
  }
};

/**
 * Seed Realistic Demo Data for Academic Presentations
 * POST /api/analytics/seed
 */
exports.seedDemoData = (req, res) => {
  try {
    // Clear existing data
    db.exec(`
      DELETE FROM events;
      DELETE FROM conversions;
    `);

    // Insert Variant A demo data: 250 visitors, 70 clicks, 18 conversions
    const visitorsA = 250;
    const clicksA = 70;
    const conversionsA = 18;

    // Insert Variant B demo data: 250 visitors, 110 clicks, 32 conversions
    const visitorsB = 250;
    const clicksB = 110;
    const conversionsB = 32;

    const eventInsert = db.prepare(`
      INSERT INTO events (session_id, variant, event_type, cta_name, created_at)
      VALUES (?, ?, ?, ?, datetime('now', ?))
    `);

    const convInsert = db.prepare(`
      INSERT INTO conversions (session_id, variant, name, email, phone, qualification, goal, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', ?))
    `);

    // Seed Variant A
    for (let i = 1; i <= visitorsA; i++) {
      const sessionId = `demo_a_session_${i}`;
      const timeOffset = `-${Math.floor(Math.random() * 48)} hours`;
      eventInsert.run(sessionId, 'A', 'page_view', 'Landing Page', timeOffset);

      if (i <= clicksA) {
        eventInsert.run(sessionId, 'A', 'cta_click', 'Learn More', timeOffset);
      }

      if (i <= conversionsA) {
        eventInsert.run(sessionId, 'A', 'conversion', 'Registration Form', timeOffset);
        convInsert.run(
          sessionId,
          'A',
          `Student A-${i}`,
          `student.a${i}@example.edu`,
          `+91 98765 0${(1000 + i).toString().slice(1)}`,
          'B.Tech / BCA',
          'Learn basic development',
          timeOffset
        );
      }
    }

    // Seed Variant B
    for (let i = 1; i <= visitorsB; i++) {
      const sessionId = `demo_b_session_${i}`;
      const timeOffset = `-${Math.floor(Math.random() * 48)} hours`;
      eventInsert.run(sessionId, 'B', 'page_view', 'Landing Page', timeOffset);

      if (i <= clicksB) {
        eventInsert.run(sessionId, 'B', 'cta_click', 'Enroll Now – Save 60%', timeOffset);
      }

      if (i <= conversionsB) {
        eventInsert.run(sessionId, 'B', 'conversion', 'Registration Form', timeOffset);
        convInsert.run(
          sessionId,
          'B',
          `Student B-${i}`,
          `student.b${i}@example.edu`,
          `+91 98765 1${(1000 + i).toString().slice(1)}`,
          null,
          null,
          timeOffset
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Demo dataset seeded successfully! Perfect for college presentations.',
      summary: {
        variantA: { visitors: visitorsA, clicks: clicksA, conversions: conversionsA, cr: '7.20%' },
        variantB: { visitors: visitorsB, clicks: clicksB, conversions: conversionsB, cr: '12.80%' },
        note: 'This is demonstration data. Real interactive events can also be added anytime.'
      }
    });
  } catch (error) {
    console.error('[Error] seedDemoData:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to seed demo data',
      details: error.message
    });
  }
};

/**
 * Reset Analytics Data (Clear Tables)
 * POST /api/analytics/reset
 */
exports.resetData = (req, res) => {
  try {
    db.exec(`
      DELETE FROM events;
      DELETE FROM conversions;
    `);

    return res.status(200).json({
      success: true,
      message: 'Database reset successfully. All visitor events and conversions cleared to 0.'
    });
  } catch (error) {
    console.error('[Error] resetData:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to reset database',
      details: error.message
    });
  }
};
