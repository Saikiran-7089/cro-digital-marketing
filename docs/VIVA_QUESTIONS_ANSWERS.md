# Viva Voce & Oral Defense Guide: Conversion Rate Optimization (CRO)

This guide contains 15 curated questions and answers to help you explain this academic project during your viva, presentation, or professor evaluation.

---

### Q1: What was the primary motivation behind building "CRO Lab"?
**Answer:**  
In Digital Marketing, acquiring web traffic is expensive (via Google Ads, Meta Ads, SEO). Conversion Rate Optimization (CRO) ensures that businesses maximize the return on investment from existing traffic by systematically testing design, copy, and form variations that turn passive visitors into active leads or customers.

---

### Q2: What is the difference between Conversion Rate (CR) and Click-Through Rate (CTR)?
**Answer:**  
- **Click-Through Rate (CTR)** measures micro-engagements: how many visitors clicked on a specific element (like the hero CTA button) relative to total page visitors.
- **Conversion Rate (CR)** measures ultimate goal achievement: how many visitors successfully completed the end conversion (such as submitting the registration form) relative to total visitors.

---

### Q3: What is A/B testing and how is it implemented here?
**Answer:**  
A/B testing (split testing) is a controlled experiment where two variants (Variant A: Control, Variant B: Challenger) are shown to randomly assigned segments of visitors at the same time. In our project, incoming visitors are randomly split 50/50, and their session variant is persisted in local storage. All interactions (`page_view`, `cta_click`, `conversion`) are stored separately by variant in our SQLite database.

---

### Q4: Why did you choose a 3-field form for Variant B instead of 6 fields?
**Answer:**  
According to Hick’s Law and cognitive load theory, each additional field on a form introduces friction, effort, and hesitation. In lead-generation funnels, asking for non-essential information (like current college or lengthy career goals) at the initial step causes drop-off. By limiting Variant B to Name, Email, and Phone, we eliminate unnecessary friction.

---

### Q5: How is price anchoring applied in this project?
**Answer:**  
In Variant B, the course shows an original price of ₹4,999 crossed out with the discounted price of ₹1,999 alongside a 60% OFF badge. The ₹4,999 serves as a mental anchor of high perceived value, making ₹1,999 feel like a significant discount and motivating faster conversion.

---

### Q6: How does the system handle division by zero in conversion rate calculation?
**Answer:**  
If a variant has 0 visitors, a naive calculation `(conversions / visitors) * 100` would produce `NaN` or `Infinity`. In our backend analytics controller (`analyticsController.js`), we check if `visitors <= 0` and return `0.0%` cleanly.

---

### Q7: Are the dashboard analytics numbers hardcoded or real?
**Answer:**  
The dashboard numbers are 100% dynamic. Every page view, CTA click, and form registration writes an actual row into the `events` and `conversions` tables in SQLite. The dashboard queries these tables using `COUNT(DISTINCT session_id)` and `COUNT(*)` to calculate rates in real time. For presentation convenience, we also provide a seed script that inserts realistic demo data when required.

---

### Q8: What is Fogg’s Behavior Model and how does it relate to CRO?
**Answer:**  
BJ Fogg’s model states that Behavior = Motivation $\times$ Ability $\times$ Prompt ($B = MAP$). Variant B boosts **Motivation** via price discounts and social proof, improves **Ability** by simplifying the form (lowering effort), and provides a clear **Prompt** via the prominent "Enroll Now" CTA.

---

### Q9: What is the difference between relative lift and absolute lift?
**Answer:**  
If Variant A has a 7.2% conversion rate and Variant B has a 12.8% conversion rate:
- **Absolute Lift** = $12.8\% - 7.2\% = 5.6\%$ percentage points.
- **Relative Lift** = $\frac{12.8 - 7.2}{7.2} \times 100 = 77.8\%$ improvement over baseline.

---

### Q10: How do you prevent duplicate submissions?
**Answer:**  
In `conversionController.js`, we query the database before inserting a new registration. If a registration with the same `sessionId` or `email` was already submitted within the last 15 minutes, the API returns HTTP 409 Conflict with a helpful warning message.

---

### Q11: What role does website speed play in CRO?
**Answer:**  
Page load speed directly affects bounce rate. Research shows that every additional second of latency can decrease conversions by up to 7%. Our project uses Vite for lightning-fast asset delivery, pure responsive SVG graphics, and a production bundle of just ~61 kB gzipped.

---

### Q12: Why did you use SQLite for this student project?
**Answer:**  
SQLite is serverless, zero-configuration, and stores data in a clean local file (`data/cro_database.sqlite`). It allows this project to run smoothly on any student or evaluator laptop without requiring external database installation like MongoDB or MySQL services.

---

### Q13: What is social proof in CRO?
**Answer:**  
Social proof is a psychological phenomenon where people look to others' experiences to guide their own decisions. In Variant B, we display 5-star ratings, student quotes, and specific project outcomes ("Built a SaaS app in Week 6") to establish trust and credibility.

---

### Q14: How can this project be extended in a commercial setting?
**Answer:**  
1. Integrating session heatmaps (e.g. Hotjar or Microsoft Clarity) to observe scroll depth.
2. Implementing Bayesian or Frequentist statistical significance (p-value, z-score, 95% confidence intervals).
3. Multivariate testing (MVT) to test combinations of headlines, colors, and button placements simultaneously.

---

### Q15: What HTTP status codes does your REST API return?
**Answer:**  
- `200 OK`: Successful retrieval of analytics or seed operation.
- `201 Created`: Successfully recorded event or registration conversion.
- `400 Bad Request`: Validation failure (empty name, invalid email, short phone).
- `409 Conflict`: Duplicate registration attempt in the same session.
- `500 Internal Server Error`: Unhandled database or server exception.
