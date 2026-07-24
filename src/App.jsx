import React from 'react';
import PublicHeader from './components/PublicHeader';
import HeroSection from './components/HeroSection';
import TrustStrip from './components/TrustStrip';
import HowItWorks from './components/HowItWorks';
import FeaturedOpportunities from './components/FeaturedOpportunities';
import CategoryGrid from './components/CategoryGrid';
import CandidateBenefits from './components/CandidateBenefits';
import PlatformJourneyPreview from './components/PlatformJourneyPreview';
import PartnerAudienceSection from './components/PartnerAudienceSection';
import TrustSafetySection from './components/TrustSafetySection';
import CandidateStories from './components/CandidateStories';
import FAQPreview from './components/FAQPreview';
import FinalCTA from './components/FinalCTA';
import PublicFooter from './components/PublicFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      <PublicHeader />
      <main>
        <HeroSection />
        <TrustStrip />
        <HowItWorks />
        <FeaturedOpportunities />
        <CategoryGrid />
        <CandidateBenefits />
        <PlatformJourneyPreview />
        <PartnerAudienceSection />
        <TrustSafetySection />
        <CandidateStories />
        <FAQPreview />
        <FinalCTA />
      </main>
      <PublicFooter />
    </div>
  );
}
