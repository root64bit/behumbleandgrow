import React from 'react';
import HeroSection from '../../components/HeroSection';
import TrustStrip from '../../components/TrustStrip';
import HowItWorks from '../../components/HowItWorks';
import FeaturedOpportunities from '../../components/FeaturedOpportunities';
import CategoryGrid from '../../components/CategoryGrid';
import CandidateBenefits from '../../components/CandidateBenefits';
import PlatformJourneyPreview from '../../components/PlatformJourneyPreview';
import PartnerAudienceSection from '../../components/PartnerAudienceSection';
import TrustSafetySection from '../../components/TrustSafetySection';
import CandidateStories from '../../components/CandidateStories';
import FAQPreview from '../../components/FAQPreview';
import FinalCTA from '../../components/FinalCTA';

export default function HomePage() {
  return (
    <div>
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
    </div>
  );
}
