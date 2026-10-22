import React, { useState, useEffect } from 'react';
import { useVariant } from './hooks/useVariant';
import VariantSwitcherBar from './components/VariantSwitcherBar';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';

export default function App() {
  const { sessionId, variant, switchVariant, trackCtaClick } = useVariant();
  
  // Simple client-side page routing: 'landing' or 'dashboard'
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.pathname === '/dashboard' || window.location.hash === '#dashboard'
      ? 'dashboard'
      : 'landing';
  });

  const navigate = (page) => {
    setCurrentPage(page);
    if (page === 'dashboard') {
      window.history.pushState({}, '', '/dashboard');
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/dashboard') {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="app-root">
      {/* 1. Academic & Evaluator Live Control Bar */}
      <VariantSwitcherBar
        variant={variant}
        switchVariant={switchVariant}
        currentPage={currentPage}
        onNavigate={navigate}
      />

      {/* 2. Brand Navbar */}
      <Navbar
        variant={variant}
        onOpenModal={(ctaName) => {
          trackCtaClick(ctaName);
          // If on dashboard, navigate back to landing and trigger
          if (currentPage !== 'landing') {
            navigate('landing');
          }
          // The modal will be triggered on landing page
          const heroBtn = document.getElementById('hero-primary-cta');
          if (heroBtn) heroBtn.click();
        }}
        onNavigate={navigate}
      />

      {/* 3. Main Page Content */}
      {currentPage === 'landing' ? (
        <LandingPage
          variant={variant}
          sessionId={sessionId}
          trackCtaClick={trackCtaClick}
        />
      ) : (
        <DashboardPage
          onNavigate={navigate}
        />
      )}

      {/* 4. Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
