import { useState, useEffect, useCallback, useRef } from 'react';
import { recordEvent } from '../services/api';

const SESSION_KEY = 'cro_session_id';
const VARIANT_KEY = 'cro_assigned_variant';

/**
 * Hook to manage A/B testing assignment, persistence, and event tracking
 */
export function useVariant() {
  // 1. Session ID Management
  const [sessionId] = useState(() => {
    let storedSession = localStorage.getItem(SESSION_KEY);
    if (!storedSession) {
      storedSession = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem(SESSION_KEY, storedSession);
    }
    return storedSession;
  });

  // 2. Variant Assignment (Random 50/50 split or URL override or local persistence)
  const [variant, setVariantState] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryVariant = urlParams.get('variant')?.toUpperCase();
    if (queryVariant === 'A' || queryVariant === 'B') {
      localStorage.setItem(VARIANT_KEY, queryVariant);
      return queryVariant;
    }

    const storedVariant = localStorage.getItem(VARIANT_KEY);
    if (storedVariant === 'A' || storedVariant === 'B') {
      return storedVariant;
    }

    // 50/50 Random Assignment for genuine A/B testing
    const assigned = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(VARIANT_KEY, assigned);
    return assigned;
  });

  const lastTrackedVariant = useRef(null);

  // 3. Track page_view event when variant is active
  useEffect(() => {
    if (lastTrackedVariant.current !== variant) {
      lastTrackedVariant.current = variant;
      recordEvent({
        sessionId,
        variant,
        eventType: 'page_view',
        ctaName: 'Landing Page View'
      });
    }
  }, [variant, sessionId]);

  // 4. Manual Variant Switcher (for Academic Evaluation & Live Testing)
  const switchVariant = useCallback((newVariant) => {
    if (newVariant !== 'A' && newVariant !== 'B') return;
    localStorage.setItem(VARIANT_KEY, newVariant);
    setVariantState(newVariant);

    // Update URL query param without full reload
    const url = new URL(window.location.href);
    url.searchParams.set('variant', newVariant);
    window.history.replaceState({}, '', url.toString());

    // Record new page view for the switched variant
    recordEvent({
      sessionId,
      variant: newVariant,
      eventType: 'page_view',
      ctaName: `Switched to Variant ${newVariant}`
    });
  }, [sessionId]);

  // 5. Track CTA click helper
  const trackCtaClick = useCallback((ctaName = 'Primary CTA') => {
    return recordEvent({
      sessionId,
      variant,
      eventType: 'cta_click',
      ctaName
    });
  }, [sessionId, variant]);

  return {
    sessionId,
    variant,
    switchVariant,
    trackCtaClick
  };
}
