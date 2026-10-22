# A/B Testing Methodology in CRO Lab

This document explains the experimental methodology, randomization logic, tracking, and evaluation implemented in the **CRO Lab** platform.

---

## 1. Experimental Hypothesis

> **Hypothesis:**  
> *"Replacing a passive CTA ('Learn More') with an urgent, benefit-driven CTA ('Enroll Now – Save 60%') and reducing registration form fields from 6 to 3 will increase conversion rate by at least 30% without decreasing total lead quality."*

---

## 2. Experimental Setup: Variant A vs. Variant B

| Element | Variant A (Control / Original) | Variant B (Challenger / Optimized) |
|---|---|---|
| **Headline** | "Learn Full-Stack Development" | "Build Real-World Web Apps and Become Job Ready" |
| **Primary CTA** | "Learn More" (Muted Slate) | "Enroll Now – Save 60%" (Vibrant Royal Blue) |
| **Social Proof** | Standard cards, text only | 5-star badges, outcome highlights, student ratings |
| **Pricing** | ₹4,999 (plain) | ₹4,999 $\to$ ₹1,999 with 60% OFF badge & guarantee |
| **Form Fields** | 6 fields (High friction) | 3 fields: Name, Email, Phone (Low friction) |
| **Target Role** | Baseline control | CRO-optimized variation |

---

## 3. Traffic Randomization & Session Persistence

To ensure genuine experimental conditions:
1. **First-Time Visitors**: The platform assigns visitors to Variant A or Variant B via a 50/50 pseudo-random split:
   ```javascript
   const assigned = Math.random() < 0.5 ? 'A' : 'B';
   ```
2. **Session Persistence**: The assigned variant and a unique `session_id` are persisted in `localStorage`. This prevents "variant flickering" when the user refreshes or navigates across pages.
3. **Evaluator Control**: For college presentations and viva demonstrations, query parameter overrides (`/?variant=A` or `/?variant=B`) and a dedicated sticky testing toolbar allow instant manual switching without corrupting existing database history.

---

## 4. Key Performance Formulas

### 1. Click-Through Rate (CTR)
$$\text{CTR (\%)} = \left( \frac{\text{CTA Clicks}}{\text{Visitors}} \right) \times 100$$

### 2. Conversion Rate (CR)
$$\text{CR (\%)} = \left( \frac{\text{Conversions}}{\text{Visitors}} \right) \times 100$$

### 3. Relative Conversion Lift
$$\text{Relative Lift (\%)} = \left( \frac{\text{CR}_B - \text{CR}_A}{\text{CR}_A} \right) \times 100$$

### 4. Absolute Lift
$$\text{Absolute Lift (\%)} = \text{CR}_B - \text{CR}_A$$

---

## 5. Identifying the Winning Variant

The backend analytics engine computes:
- If $\text{CR}_B > \text{CR}_A \implies$ **Variant B (Optimized)** is crowned the winner with calculated relative lift.
- If $\text{CR}_A > \text{CR}_B \implies$ **Variant A (Original)** is the winner.
- If sample size is 0 or rates are identical $\implies$ **Tied / Awaiting Traffic**.
