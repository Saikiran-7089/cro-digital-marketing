const db = require('../config/db');

/**
 * Record an event (e.g. page_view, cta_click, form_start, conversion)
 * POST /api/events
 */
exports.recordEvent = (req, res) => {
  try {
    const { sessionId, variant, eventType, ctaName } = req.body;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid sessionId'
      });
    }

    if (!variant || !['A', 'B'].includes(variant.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: 'Variant must be either "A" or "B"'
      });
    }

    const validEventTypes = ['page_view', 'cta_click', 'form_start', 'conversion'];
    if (!eventType || !validEventTypes.includes(eventType)) {
      return res.status(400).json({
        success: false,
        error: `Invalid eventType. Allowed types: ${validEventTypes.join(', ')}`
      });
    }

    const cleanVariant = variant.toUpperCase();
    const cleanCtaName = ctaName ? String(ctaName).trim() : 'General';

    // Insert into events table
    const stmt = db.prepare(`
      INSERT INTO events (session_id, variant, event_type, cta_name)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(sessionId, cleanVariant, eventType, cleanCtaName);

    return res.status(201).json({
      success: true,
      message: 'Event recorded successfully',
      event: {
        id: result.lastInsertRowid || result.lastID,
        sessionId,
        variant: cleanVariant,
        eventType,
        ctaName: cleanCtaName
      }
    });
  } catch (error) {
    console.error('[Error] recordEvent:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error recording event',
      details: error.message
    });
  }
};
