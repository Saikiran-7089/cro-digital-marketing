# Viva Voce & Oral Defense Guide: Conversion Rate Optimization (CRO)

This guide contains 15 curated questions and answers matching the core academic syllabus for Conversion Rate Optimization and A/B Testing in Digital Marketing.

---

### Q1: What is Conversion Rate Optimization (CRO)?
**Answer:**  
Conversion Rate Optimization (CRO) is the systematic, data-driven marketing process of improving website design, copywriting, page architecture, and user experience to increase the percentage of visitors who complete a desired macro or micro action (such as course enrollment, lead capture, or purchase) without necessarily increasing total traffic.

---

### Q2: What is A/B testing?
**Answer:**  
A/B testing (also called split testing) is a controlled marketing experiment where two or more versions of a webpage (Variant A: Control, Variant B: Challenger) are shown simultaneously to randomly partitioned segments of visitors to measure which version yields a statistically superior conversion rate.

---

### Q3: Why use two variants (Variant A vs. Variant B)?
**Answer:**  
Using two variants provides an experimental baseline:
- **Variant A (Control)** represents the conventional baseline design with standard headlines, lower contrast, and a longer friction-heavy form.
- **Variant B (Challenger)** implements CRO hypotheses: action-oriented CTAs, simplified 3-field form, social proof badges, and price anchoring.  
Comparing both simultaneously isolates external temporal variables (like seasonal trends or time of day) so differences in conversion rate can be attributed directly to the CRO design changes.

---

### Q4: What is Conversion Rate (CR) and how is it calculated?
**Answer:**  
Conversion Rate is the percentage of total unique visitors who complete the desired conversion goal.  
$$\text{Conversion Rate (\%)} = \left( \frac{\text{Total Conversions}}{\text{Total Unique Visitors}} \right) \times 100$$  
*Example:* 32 conversions from 250 visitors = $(32 / 250) \times 100 = 12.80\%$. In our backend, if visitors = 0, the system safely returns `0.0%` to prevent division-by-zero errors.

---

### Q5: What is Click-Through Rate (CTR) and how does it differ from Conversion Rate?
**Answer:**  
Click-Through Rate (CTR) measures the percentage of visitors who click on a specific interactive element, such as the primary Call-to-Action button:  
$$\text{CTR (\%)} = \left( \frac{\text{CTA Clicks}}{\text{Total Visitors}} \right) \times 100$$  
CTR measures micro-engagement (intent to enroll), whereas Conversion Rate measures macro-completion (successful registration form submission).

---

### Q6: What is Relative Lift and how is it calculated?
**Answer:**  
Relative Lift quantifies the percentage improvement of Variant B over the baseline Variant A:  
$$\text{Relative Lift (\%)} = \left( \frac{\text{CR}_B - \text{CR}_A}{\text{CR}_A} \right) \times 100$$  
*Example:* With Variant A at $7.2\%$ and Variant B at $12.8\%$:  
$$\text{Relative Lift} = \frac{12.8 - 7.2}{7.2} \times 100 \approx +77.8\%$$

---

### Q7: Why reduce form fields in Variant B?
**Answer:**  
According to Hick’s Law and cognitive friction research, each additional form field increases user cognitive burden, input fatigue, and privacy concerns, especially on mobile devices. Reducing the form from 6 fields in Variant A to 3 essential fields (Name, Email, Phone) in Variant B removes unnecessary friction, resulting in a substantially higher completion rate.

---

### Q8: Why use a strong, benefit-driven Call-to-Action (CTA)?
**Answer:**  
A generic CTA like "Learn More" (Variant A) is passive and creates uncertainty about the next step. An action-oriented, value-infused CTA like "Enroll Now – Save 60%" (Variant B) creates clarity, highlights immediate economic benefit, and establishes a clear prompt according to Fogg’s Behavior Model ($B = MAP$).

---

### Q9: What is social proof and how is it implemented?
**Answer:**  
Social proof (Robert Cialdini) is the psychological tendency of individuals to rely on others' actions to determine their own behavior in situations of uncertainty. In Variant B, we display 5-star ratings, student avatars, and specific project outcomes ("Built a SaaS app in Week 6") to establish trust and credibility.

---

### Q10: What is price anchoring in CRO?
**Answer:**  
Price anchoring is a cognitive bias where the first price shown serves as a mental reference point. In Variant B, showing the original price of ₹4,999 crossed out alongside the discounted price of ₹1,999 with a "60% OFF" badge anchors high perceived value and frames the purchase as an attractive savings opportunity.

---

### Q11: How is visitor traffic split between variants?
**Answer:**  
Incoming visitors are assigned to Variant A or Variant B through a 50/50 pseudo-random split:  
`const assigned = Math.random() < 0.5 ? 'A' : 'B';`  
To prevent "variant flickering" upon page refreshes, the assigned variant is persisted in `localStorage` alongside a unique session ID.

---

### Q12: How and where is the data stored?
**Answer:**  
All events and conversions are stored in a local SQLite relational database (`cro_database.sqlite`). The schema contains two structured tables:
1. `events`: Records `session_id`, `variant` ('A'/'B'), `event_type` (`page_view`, `cta_click`), and `cta_name`.
2. `conversions`: Records `session_id`, `variant`, `name`, `email`, and `phone`.

---

### Q13: How are conversions tracked in real time?
**Answer:**  
When a visitor views the landing page, the client sends a `POST /api/events` request with `eventType: 'page_view'`. When they click the CTA, a `POST /api/events` request is dispatched with `eventType: 'cta_click'`. When the form is submitted, `POST /api/conversions` validates the fields, prevents duplicate submissions, and logs the conversion record. The dashboard aggregates these raw database rows dynamically.

---

### Q14: Why was SQLite selected for this student project?
**Answer:**  
SQLite is serverless, zero-configuration, and file-based. It requires no background database daemon or cloud credentials to be pre-installed, allowing the project to run seamlessly and reliably on any Windows, macOS, or Linux student laptop with Node.js.

---

### Q15: What are the limitations of this academic experiment?
**Answer:**  
1. **Sample Size & Duration**: In production marketing, tests must run across complete business cycles (typically 2 to 4 weeks) to account for day-of-week seasonality.
2. **External Traffic Noise**: Real marketing accounts for diverse traffic channels (organic vs. paid search vs. social ads) which may convert at different rates.
3. **Statistical Significance**: A production implementation would compute two-tailed p-values ($p < 0.05$) and confidence intervals (95% confidence) before finalizing decisions.
