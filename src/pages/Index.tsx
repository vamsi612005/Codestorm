import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";

import ExperienceSection from "@/components/ExperienceSection";
import FutureSection from "@/components/FutureSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <ExperienceSection />
        <BenefitsSection />
        <FutureSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
