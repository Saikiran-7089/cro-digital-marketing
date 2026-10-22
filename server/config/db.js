const path = require('path');
const fs = require('fs');

// Ensure data folder exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(__dirname, '..', process.env.DATABASE_PATH)
  : path.join(dataDir, 'cro_database.sqlite');

let db;

try {
  // Primary: try better-sqlite3
  const Database = require('better-sqlite3');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  console.log(`[Database] Connected via better-sqlite3: ${dbPath}`);
} catch (err) {
  try {
    // Secondary fallback: Node 22+ built-in node:sqlite
    const { DatabaseSync } = require('node:sqlite');
    db = new DatabaseSync(dbPath);
    console.log(`[Database] Connected via node:sqlite: ${dbPath}`);
  } catch (fallbackErr) {
    console.error('[Database] Failed to initialize SQLite engine:', fallbackErr.message);
    throw fallbackErr;
  }
}

/**
 * Initialize Tables for CRO Lab
 * 
 * 1. events table:
 *    - id: unique event identifier
 *    - session_id: browser session uuid
 *    - variant: 'A' (Original) or 'B' (Optimized)
 *    - event_type: 'page_view' | 'cta_click' | 'form_start' | 'conversion'
 *    - cta_name: label of the button clicked (e.g., 'Hero CTA', 'Pricing CTA')
 *    - timestamp: ISO 8601 string
 * 
 * 2. conversions table:
 *    - id: unique conversion record
 *    - session_id: browser session uuid
 *    - variant: 'A' or 'B'
 *    - name: user full name
 *    - email: user email
 *    - phone: contact number
 *    - qualification: captured in Variant A (for friction testing)
 *    - goal: career goal captured in Variant A
 *    - timestamp: ISO 8601 string
 */
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      variant TEXT NOT NULL,
      event_type TEXT NOT NULL,
      cta_name TEXT DEFAULT 'General',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS conversions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      variant TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      qualification TEXT DEFAULT NULL,
      goal TEXT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_events_variant ON events(variant);
    CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
    CREATE INDEX IF NOT EXISTS idx_conversions_variant ON conversions(variant);
  `);

  console.log('[Database] Schema verified and indexes created.');
}

initDatabase();

module.exports = db;
