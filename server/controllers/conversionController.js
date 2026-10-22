const db = require('../config/db');

// Basic regex for email and phone validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,14}$/;

/**
 * Record a registration conversion
 * POST /api/conversions
 */
exports.recordConversion = (req, res) => {
  try {
    const { sessionId, variant, name, email, phone, qualification, goal } = req.body;

    // Validation
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

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Name is required and must be at least 2 characters'
      });
    }

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address (e.g. user@example.com)'
      });
    }

    if (!phone || !PHONE_REGEX.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number (at least 7 to 15 digits)'
      });
    }

    const cleanVariant = variant.toUpperCase();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanQual = qualification ? String(qualification).trim() : null;
    const cleanGoal = goal ? String(goal).trim() : null;

    // Check for duplicate submission by same session or email in the last 15 minutes
    const checkStmt = db.prepare(`
      SELECT id FROM conversions 
      WHERE (session_id = ? OR email = ?)
      AND created_at >= datetime('now', '-15 minutes')
      LIMIT 1
    `);
    const existing = checkStmt.get(sessionId, cleanEmail);

    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'You have already registered recently for this course. Please check your email!'
      });
    }

    // Insert into conversions
    const insertStmt = db.prepare(`
      INSERT INTO conversions (session_id, variant, name, email, phone, qualification, goal)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = insertStmt.run(sessionId, cleanVariant, cleanName, cleanEmail, cleanPhone, cleanQual, cleanGoal);

    // Also record event in events table
    const eventStmt = db.prepare(`
      INSERT INTO events (session_id, variant, event_type, cta_name)
      VALUES (?, ?, 'conversion', 'Registration Form')
    `);
    eventStmt.run(sessionId, cleanVariant);

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to SkillBoost Academy.',
      conversion: {
        id: result.lastInsertRowid || result.lastID,
        sessionId,
        variant: cleanVariant,
        name: cleanName,
        email: maskEmail(cleanEmail),
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('[Error] recordConversion:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error processing registration',
      details: error.message
    });
  }
};

/**
 * Get recent conversions for evaluator inspection (masked for student privacy)
 * GET /api/conversions
 */
exports.getRecentConversions = (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, session_id, variant, name, email, phone, qualification, goal, created_at 
      FROM conversions
      ORDER BY id DESC
      LIMIT 20
    `);
    const rows = stmt.all();

    const maskedRows = rows.map(row => ({
      id: row.id,
      sessionId: row.session_id,
      variant: row.variant,
      name: row.name,
      email: maskEmail(row.email),
      phone: maskPhone(row.phone),
      qualification: row.qualification,
      goal: row.goal,
      createdAt: row.created_at
    }));

    return res.status(200).json({
      success: true,
      count: maskedRows.length,
      data: maskedRows
    });
  } catch (error) {
    console.error('[Error] getRecentConversions:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve conversions'
    });
  }
};

function maskEmail(email) {
  if (!email || !email.includes('@')) return email;
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user.substring(0, 2)}***${user[user.length - 1]}@${domain}`;
}

function maskPhone(phone) {
  if (!phone || phone.length < 5) return '***';
  return phone.slice(0, 3) + '*****' + phone.slice(-2);
}
