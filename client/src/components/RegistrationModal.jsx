import React, { useState } from 'react';
import { X, CheckCircle, Lock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { recordConversion } from '../services/api';

export default function RegistrationModal({ isOpen, onClose, variant, sessionId, onSuccessConversion }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    organization: '',
    goal: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Full name is required (min 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,14}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (min 7 digits)';
    }

    if (variant === 'A') {
      if (!formData.qualification) {
        newErrors.qualification = 'Please select your highest qualification';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        sessionId,
        variant,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        qualification: formData.qualification || null,
        goal: formData.goal || null
      };

      const result = await recordConversion(payload);
      if (result.success) {
        setIsSuccess(true);
        if (onSuccessConversion) onSuccessConversion();
      } else {
        setServerError(result.error || 'Registration failed');
      }
    } catch (err) {
      setServerError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {isSuccess ? (
          <div className="success-screen">
            <div className="success-icon-wrap">
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>
              Registration Successful!
            </h3>
            <p style={{ color: '#16a34a', fontWeight: 600, marginBottom: '0.75rem' }}>
              Welcome to SkillBoost Academy.
            </p>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Your enrollment conversion has been successfully recorded in the backend database.
              Welcome materials will be dispatched shortly.
            </p>
            <button
              type="button"
              className="btn-hero-vb"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={onClose}
            >
              Continue Exploring
            </button>
          </div>
        ) : (
          <div>
            <div className="form-header">
              <span className="evaluator-badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                {variant === 'B' ? 'Variant B: Simplified Form' : 'Variant A: Standard Form'}
              </span>
              <h3>
                {variant === 'B' ? 'Fast 1-Minute Enrollment' : 'Course Application Form'}
              </h3>
              <p>
                {variant === 'B'
                  ? 'Enter your details below to get instant access to the course modules.'
                  : 'Please complete all required fields to register your application.'}
              </p>
            </div>

            {/* Academic CRO Note Banner */}
            <div className="cro-comparison-banner">
              <strong>CRO Lesson: </strong>
              {variant === 'B'
                ? 'Simplified 3-field form removes cognitive friction and maximizes form conversion rate.'
                : 'Long 6-field form introduces user fatigue and higher abandonment rates.'}
            </div>

            {serverError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: '8px', color: '#b91c1c', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <AlertCircle size={18} />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Field 1: Name */}
              <div className="form-field">
                <label className="form-label" htmlFor="name">
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.name}</p>}
              </div>

              {/* Field 2: Email */}
              <div className="form-field">
                <label className="form-label" htmlFor="email">
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="e.g. student@example.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</p>}
              </div>

              {/* Field 3: Phone */}
              <div className="form-field">
                <label className="form-label" htmlFor="phone">
                  Phone Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.phone}</p>}
              </div>

              {/* Extra Fields ONLY for Variant A (Friction test) */}
              {variant === 'A' && (
                <>
                  <div className="form-field">
                    <label className="form-label" htmlFor="qual">
                      Highest Qualification <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      id="qual"
                      className="form-select"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    >
                      <option value="">-- Select Qualification --</option>
                      <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                      <option value="BCA / MCA">BCA / MCA</option>
                      <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.qualification && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.qualification}</p>}
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="org">
                      College / University Name
                    </label>
                    <input
                      id="org"
                      type="text"
                      className="form-input"
                      placeholder="e.g. City Engineering College"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="goal">
                      What is your primary learning goal?
                    </label>
                    <textarea
                      id="goal"
                      className="form-input"
                      rows="2"
                      placeholder="e.g. Campus placement preparation or freelancing"
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div>
                {variant === 'B' ? (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-submit-form btn-hero-vb"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {submitting ? (
                      'Processing...'
                    ) : (
                      <>
                        <Sparkles size={16} /> Complete My Enrollment <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-submit-form btn-hero-va"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {submitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                )}
              </div>

              <div className="form-trust-text">
                <Lock size={13} />
                <span>
                  {variant === 'B'
                    ? '100% Secure • Instant Access • No Spam Ever'
                    : 'Personal data processed under academic privacy terms.'}
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
