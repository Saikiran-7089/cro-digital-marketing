import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ValueProps from '../components/ValueProps';
import CourseCurriculum from '../components/CourseCurriculum';
import SocialProof from '../components/SocialProof';
import PricingSection from '../components/PricingSection';
import RegistrationModal from '../components/RegistrationModal';

export default function LandingPage({ variant, sessionId, trackCtaClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastCtaName, setLastCtaName] = useState('Hero Primary CTA');

  const handleCtaClick = (ctaName) => {
    setLastCtaName(ctaName);
    trackCtaClick(ctaName);
    setIsModalOpen(true);
  };

  return (
    <main>
      <HeroSection
        variant={variant}
        onCtaClick={handleCtaClick}
      />

      <ValueProps variant={variant} />

      <CourseCurriculum />

      <SocialProof variant={variant} />

      <PricingSection
        variant={variant}
        onCtaClick={handleCtaClick}
      />

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant={variant}
        sessionId={sessionId}
        onSuccessConversion={() => {
          // Additional success callback if needed
        }}
      />
    </main>
  );
}
