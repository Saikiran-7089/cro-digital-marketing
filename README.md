# CRO Lab – Conversion Rate Optimization & A/B Testing Platform

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![SQLite](https://img.shields.io/badge/Database-SQLite-003B57.svg)](https://www.sqlite.org/)
[![Academic](https://img.shields.io/badge/Course-Digital%20Marketing-orange.svg)]()

> **Digital Marketing Academic Project**  
> **Project Name:** CRO Lab – Conversion Rate Optimization & A/B Testing Platform  
> **Repository Name:** `cro-digital-marketing`  

---

## 📖 Project Description

**CRO Lab** is a complete, working academic web application demonstrating the practical principles of **Conversion Rate Optimization (CRO)** and **A/B Testing** in Digital Marketing.

The application allows students, teachers, and evaluators to experience:
- **Conversion Rate Optimization (CRO)**: Systematically turning passive landing-page traffic into enrolled leads.
- **A/B Testing**: Controlled split testing between a baseline control (Variant A) and an optimized page (Variant B).
- **CTA Optimization**: Measuring the impact of high-contrast, action-driven verbs versus passive buttons.
- **Form Simplification**: Demonstrating how reducing cognitive friction (3 fields vs. 6 fields) directly reduces form abandonment.
- **Social Proof**: Trust architecture utilizing verified student reviews and 5-star ratings.
- **Pricing Psychology & Anchoring**: Leveraging original price anchors to maximize perceived savings.
- **Live Conversion Tracking**: Real backend tracking of page views, CTA clicks, and form submissions.
- **Real-Time Analytics Dashboard**: Automatic calculation of Conversion Rate (CR), Click-Through Rate (CTR), and Relative Lift (%).

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18
  - Vite 5 (Fast build & hot reload)
  - Vanilla CSS (Custom design system, zero bloated CSS frameworks)
  - Lucide React (Clean SVG icons)
- **Backend**:
  - Node.js
  - Express.js (REST API, CORS middleware)
- **Database**:
  - SQLite (Local serverless database via `better-sqlite3` with auto-fallback to native `node:sqlite`)
- **Testing**:
  - Node.js native test runner (`node:test`, `node:assert`)
- **Process Orchestration**:
  - Concurrently (Run client and server simultaneously from the root)

---

## 🌐 Application URLs

| Service | Local URL | Description |
|---|---|---|
| **Frontend Landing Page** | `http://localhost:5173` | Course landing page with A/B variant testing |
| **Analytics Dashboard** | `http://localhost:5173/dashboard` | Real-time CRO metrics, charts & viva guide |
| **Backend REST API** | `http://localhost:5000` | Express API server |
| **Backend Health Check** | `http://localhost:5000/api/health` | API health check endpoint |

---

## 🚀 Quick Start & Installation

The project is fully configured to run directly from the **ROOT** directory on Windows, macOS, or Linux.

### Step 1: Install Dependencies
Run from the project root:
```bash
npm install
npm run install:all
```
*`npm install` sets up root tools (like concurrently), and `npm run install:all` installs all dependencies for both `server` and `client`.*

### Step 2: Start Both Frontend and Backend Concurrently
Run from the project root:
```bash
npm run dev
```
*This starts the Express server (`http://localhost:5000`) and the Vite client (`http://localhost:5173`) in a single terminal.*

> **Alternative Individual Commands:**
> - Start Backend Server: `npm run server`
> - Start Frontend Client: `npm run client`

---

## 📊 Demo Seed Data (For Academic Presentations)

To populate the database with realistic demonstration data for your viva or presentation:

```bash
npm run seed
```

This inserts:
- **Variant A (Control)**: 250 visitors, 70 clicks, 18 conversions (**7.2% CR**)
- **Variant B (Optimized)**: 250 visitors, 110 clicks, 32 conversions (**12.8% CR**)
- **Relative Conversion Lift**: **+77.8%** in favor of Variant B
- **Winning Variant**: Variant B (Optimized)

> You can also click the **"Load Demo Data"** button directly on the `/dashboard` UI, or click **"Reset to 0"** to clear the database and test real-time clicks.

---

## 🧪 Running Automated Tests

Run all backend validation and calculation tests from the project root:

```bash
npm test
```

### Test Suite Results:
```text
▶ CRO Lab Backend API & Analytics Tests
  ✔ 1. API Health Check returns 200 and healthy status
  ✔ 2. Event Tracking: Records page_view and cta_click for Variant A and B
  ✔ 3. Event Tracking: Rejects invalid variant or invalid eventType
  ✔ 4. Form Validation: Rejects missing name, invalid email, or short phone
  ✔ 5. Conversion Recording: Successfully registers student and increments conversion event
  ✔ 6. Duplicate Prevention: Prevents accidental duplicate submission in same session
  ✔ 7. Analytics: Correctly calculates overall conversion rate without NaN or division by zero
  ✔ 8. A/B Variant Comparison: Tracks Variant A and B separately and calculates Lift & Winner
  ✔ 9. Seeding & Resetting: Seed fills mock data, reset resets everything to 0
✔ CRO Lab Backend API & Analytics Tests (9 passed, 0 failed)
```

---

## 🏗️ Production Build

Verify the production build from the project root:

```bash
npm run build
```

The production frontend bundle is compiled cleanly to `client/dist/` in ~1.4 seconds with zero errors.

---

## 📸 Screenshots

| 1. Baseline Variant A (Friction Form) | 2. Optimized Variant B (High CRO) |
|---|---|
| ![Variant A Friction Form](screenshots/00_variant_a_friction_form.png) | ![Landing Page Variant B](screenshots/01_landing_page_variant_b.png) |

| 3. Simplified 3-Field Modal (Low Friction) | 4. Registration Success Confirmation |
|---|---|
| ![Simplified Modal](screenshots/02_simplified_registration_modal.png) | ![Registration Success](screenshots/03_registration_success.png) |

| 5. Live CRO Analytics Dashboard | 6. Viva Study & Oral Defense Guide |
|---|---|
| ![Analytics Dashboard](screenshots/04_analytics_dashboard.png) | ![Viva Study Guide](screenshots/05_viva_study_guide.png) |

---

## 🧪 A/B Testing & CRO Implementation

Incoming visitors are assigned to Variant A or Variant B through a 50/50 pseudo-random split:
```javascript
const assigned = Math.random() < 0.5 ? 'A' : 'B';
```
The variant and session ID are persisted in `localStorage` to eliminate variant flickering upon page reload.

### Experimental Comparison

| Element | Variant A (Baseline Control) | Variant B (CRO-Optimized) | Behavioral Marketing Principle |
|---|---|---|---|
| **Headline** | *"Learn Full-Stack Development"* | *"Build Real-World Web Apps and Become Job Ready"* | Benefit-focused headline addressing career aspirations. |
| **Primary CTA** | *"Learn More"* (Subdued Slate) | *"Enroll Now – Save 60%"* (Vibrant Royal Blue) | **Fitts's Law**: High contrast, action-oriented verb. |
| **Registration Form** | 6 fields (High friction) | 3 essential fields (Name, Email, Phone) | **Hick's Law**: Eliminating friction maximizes completions. |
| **Social Proof** | Unformatted text blocks | 5-star ratings, avatars, and project milestones | **Cialdini’s Social Proof**: Reassures prospective learners. |
| **Pricing** | ₹4,999 (plain price) | ₹4,999 crossed out $\to$ **₹1,999** (60% OFF) | **Price Anchoring**: Highlights clear perceived savings. |
| **Risk Reversal** | Standard policy terms | "7-Day Money-Back Guarantee + Instant Access" | Reverses psychological risk for new prospects. |

---

## 📐 Mathematical Formulas

$$\text{Conversion Rate (\%)} = \left( \frac{\text{Conversions}}{\text{Visitors}} \right) \times 100$$

$$\text{Click-Through Rate (\%)} = \left( \frac{\text{CTA Clicks}}{\text{Visitors}} \right) \times 100$$

$$\text{Relative Lift (\%)} = \left( \frac{\text{CR}_B - \text{CR}_A}{\text{CR}_A} \right) \times 100$$

*Edge Case Handling:* If total visitors = 0, the backend returns `0.0%` safely to prevent `NaN` or unhandled runtime exceptions.

---

## 🔌 Backend API Documentation

| Method | Endpoint | Description | Sample Payload |
|---|---|---|---|
| `GET` | `/api/health` | Health check endpoint | — |
| `POST` | `/api/events` | Record visitor interaction (`page_view`, `cta_click`) | `{"sessionId": "s1", "variant": "B", "eventType": "page_view"}` |
| `POST` | `/api/conversions` | Submit student enrollment form | `{"sessionId": "s1", "variant": "B", "name": "Aarav", "email": "a@edu.com", "phone": "9876543210"}` |
| `GET` | `/api/conversions` | Retrieve recent conversions (privacy masked) | — |
| `GET` | `/api/analytics` | Overall KPI summary | — |
| `GET` | `/api/analytics/variants` | A/B comparison metrics & winning variant | — |
| `GET` | `/api/analytics/funnel` | 3-stage funnel metrics for charts | — |
| `POST` | `/api/analytics/seed` | Seed demo data for presentations | — |
| `POST` | `/api/analytics/reset` | Reset all metrics to zero | — |

---

## 📚 Academic Documentation

In the `docs/` folder:
- **[`docs/CRO_PRINCIPLES.md`](docs/CRO_PRINCIPLES.md)**: Detailed breakdown of CRO theory, cognitive friction, Fogg’s Behavior Model, and price psychology.
- **[`docs/AB_TESTING_EXPLAINED.md`](docs/AB_TESTING_EXPLAINED.md)**: Scientific hypothesis formulation, sample sizes, and split-testing methodology.
- **[`docs/VIVA_QUESTIONS_ANSWERS.md`](docs/VIVA_QUESTIONS_ANSWERS.md)**: 15 curated viva voce questions and answers for oral presentation defense.

---

## 📄 License & Attribution

Developed as an academic project for a **Digital Marketing** course on Conversion Rate Optimization. Fictional brand name (**SkillBoost Academy**), testimonials, and course content are used for demonstration purposes.

**License:** MIT
