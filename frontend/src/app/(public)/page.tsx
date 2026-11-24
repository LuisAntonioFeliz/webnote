import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Hero } from "@/components/landing/Hero";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { RecommendationsSection } from "@/components/landing/RecommendationsSection";

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <Hero />
        <FeatureGrid />
        <RecommendationsSection />
      </main>
      <LandingFooter />
    </>
  );
}
