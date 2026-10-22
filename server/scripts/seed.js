require('dotenv').config();
const db = require('../config/db');

console.log('[Seed] Populating realistic demonstration data for CRO Lab...');

try {
  // Clear existing
  db.exec(`
    DELETE FROM events;
    DELETE FROM conversions;
  `);

  const visitorsA = 250;
  const clicksA = 70;
  const conversionsA = 18;

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
    const sessionId = `demo_a_${i}`;
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
        'Learn basic web development',
        timeOffset
      );
    }
  }

  // Seed Variant B
  for (let i = 1; i <= visitorsB; i++) {
    const sessionId = `demo_b_${i}`;
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

  console.log('✅ Demo data seeded successfully:');
  console.log(`   - Variant A: ${visitorsA} Visitors, ${clicksA} Clicks, ${conversionsA} Conversions (CR: ${(conversionsA / visitorsA * 100).toFixed(1)}%)`);
  console.log(`   - Variant B: ${visitorsB} Visitors, ${clicksB} Clicks, ${conversionsB} Conversions (CR: ${(conversionsB / visitorsB * 100).toFixed(1)}%)`);
  console.log(`   - Relative Conversion Lift: +${(((conversionsB / visitorsB - conversionsA / visitorsA) / (conversionsA / visitorsA)) * 100).toFixed(1)}%`);
} catch (err) {
  console.error('❌ Failed to seed database:', err);
  process.exit(1);
}
