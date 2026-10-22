const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../server');
const db = require('../config/db');

let server;
let baseUrl;

before(async () => {
  // Start server on an ephemeral port for testing
  await new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      console.log(`[Test Server] Running at ${baseUrl}`);
      resolve();
    });
  });

  // Clear test DB
  db.exec(`
    DELETE FROM events;
    DELETE FROM conversions;
  `);
});

after(() => {
  if (server) server.close();
});

describe('CRO Lab Backend API & Analytics Tests', () => {

  test('1. API Health Check returns 200 and healthy status', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'healthy');
    assert.ok(body.project.includes('CRO Lab'));
  });

  test('2. Event Tracking: Records page_view and cta_click for Variant A and B', async () => {
    // Record page view for Variant A
    const resA = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_user_1',
        variant: 'A',
        eventType: 'page_view'
      })
    });
    assert.equal(resA.status, 201);
    const bodyA = await resA.json();
    assert.equal(bodyA.success, true);
    assert.equal(bodyA.event.variant, 'A');

    // Record CTA click for Variant A
    const resCta = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_user_1',
        variant: 'A',
        eventType: 'cta_click',
        ctaName: 'Learn More'
      })
    });
    assert.equal(resCta.status, 201);

    // Record page view for Variant B
    const resB = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_user_2',
        variant: 'B',
        eventType: 'page_view'
      })
    });
    assert.equal(resB.status, 201);
  });

  test('3. Event Tracking: Rejects invalid variant or invalid eventType', async () => {
    const res = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_err',
        variant: 'C', // Invalid variant
        eventType: 'page_view'
      })
    });
    assert.equal(res.status, 400);

    const res2 = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_err',
        variant: 'A',
        eventType: 'fake_event' // Invalid eventType
      })
    });
    assert.equal(res2.status, 400);
  });

  test('4. Form Validation: Rejects missing name, invalid email, or short phone', async () => {
    // Empty Name
    const res1 = await fetch(`${baseUrl}/api/conversions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'sess_val_1',
        variant: 'B',
        name: '',
        email: 'student@example.com',
        phone: '9876543210'
      })
    });
    assert.equal(res1.status, 400);

    // Invalid Email
    const res2 = await fetch(`${baseUrl}/api/conversions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'sess_val_2',
        variant: 'B',
        name: 'Aarav Patel',
        email: 'invalid-email-format',
        phone: '9876543210'
      })
    });
    assert.equal(res2.status, 400);

    // Bad Phone
    const res3 = await fetch(`${baseUrl}/api/conversions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'sess_val_3',
        variant: 'B',
        name: 'Aarav Patel',
        email: 'aarav@example.com',
        phone: '123' // Too short
      })
    });
    assert.equal(res3.status, 400);
  });

  test('5. Conversion Recording: Successfully registers student and increments conversion event', async () => {
    const res = await fetch(`${baseUrl}/api/conversions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_user_2',
        variant: 'B',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210'
      })
    });

    assert.equal(res.status, 201);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.conversion.variant, 'B');
    assert.ok(body.message.includes('Welcome to SkillBoost Academy'));
  });

  test('6. Duplicate Prevention: Prevents accidental duplicate submission in same session', async () => {
    const res = await fetch(`${baseUrl}/api/conversions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_user_2',
        variant: 'B',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210'
      })
    });

    assert.equal(res.status, 409); // Conflict / duplicate
  });

  test('7. Analytics: Correctly calculates overall conversion rate without NaN or division by zero', async () => {
    const res = await fetch(`${baseUrl}/api/analytics`);
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.success, true);
    assert.ok(body.data.totalVisitors >= 2);
    assert.ok(body.data.totalConversions >= 1);
    assert.equal(typeof body.data.overallConversionRate, 'number');
    assert.ok(!isNaN(body.data.overallConversionRate));
  });

  test('8. A/B Variant Comparison: Tracks Variant A and B separately and calculates Lift & Winner', async () => {
    const res = await fetch(`${baseUrl}/api/analytics/variants`);
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.success, true);
    assert.ok(body.data.variantA);
    assert.ok(body.data.variantB);
    assert.equal(body.data.variantB.conversions, 1);
    assert.equal(body.data.summary.winningVariant, 'Variant B (Optimized)');
    assert.ok(Array.isArray(body.data.insights));
  });

  test('9. Seeding & Resetting: Seed fills mock data, reset resets everything to 0', async () => {
    // Test Seed
    const seedRes = await fetch(`${baseUrl}/api/analytics/seed`, { method: 'POST' });
    assert.equal(seedRes.status, 200);

    const checkSeed = await fetch(`${baseUrl}/api/analytics/variants`);
    const seedData = (await checkSeed.json()).data;
    assert.equal(seedData.variantA.visitors, 250);
    assert.equal(seedData.variantB.visitors, 250);
    assert.equal(seedData.variantA.conversions, 18);
    assert.equal(seedData.variantB.conversions, 32);

    // Test Reset
    const resetRes = await fetch(`${baseUrl}/api/analytics/reset`, { method: 'POST' });
    assert.equal(resetRes.status, 200);

    const checkReset = await fetch(`${baseUrl}/api/analytics`);
    const resetData = (await checkReset.json()).data;
    assert.equal(resetData.totalVisitors, 0);
    assert.equal(resetData.totalConversions, 0);
    assert.equal(resetData.overallConversionRate, 0); // No division by zero error!
  });
});
