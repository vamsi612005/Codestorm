import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Globe, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import KeynoteModal from "./KeynoteModal";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-16 border-b border-grid-line relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto">
        <div className="grid grid-cols-12 border border-grid-line bg-background/50 backdrop-blur-sm">
          {/* Main Hero Content */}
          <div className="col-span-12 lg:col-span-8 border-b lg:border-b-0 lg:border-r border-grid-line p-8 lg:p-16 relative">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 animate-fade-in hover:bg-primary/20 transition-colors cursor-default">
                <Globe className="w-4 h-4 text-primary animate-pulse-soft" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Introduction to AI in Education</span>
              </div>

              {/* Headline */}
              <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] mb-8 animate-fade-in tracking-tight" style={{ animationDelay: "0.1s" }}>
                Neev<span className="text-primary">.AI</span>
                <br />
                <span className="text-4xl lg:text-6xl text-muted-foreground font-bold block mt-2">Revolutionizing Study Habits</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                An Intelligent Learning Companion that adapts to your unique learning style.
                Experience the future of autonomous learning where every interaction makes you smarter.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-5 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Button variant="hero" size="xl" className="btn-glow" onClick={() => navigate("/student-app")}>
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <KeynoteModal>
                  <Button variant="hero-outline" size="xl" className="group">
                    <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                    Watch Keynote
                  </Button>
                </KeynoteModal>
              </div>
            </div>
          </div>

          {/* Visual Side - 3D Abstract Representation */}
          <div className="col-span-12 lg:col-span-4 relative min-h-[400px] lg:min-h-auto overflow-hidden bg-grid-pattern">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            {/* Isometric Grid Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 animate-float">
                {/* Central Core */}
                <div className="absolute inset-0 m-auto w-32 h-32 bg-gradient-to-br from-primary to-blue-600 rounded-3xl transform rotate-45 shadow-[0_0_60px_rgba(45,212,191,0.5)] z-20 flex items-center justify-center border border-white/20">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-[-40px] border border-dashed border-white/20 rounded-full animate-spin-slow-reverse" style={{ animationDuration: '30s' }} />

                {/* Floating Glass Panels */}
                <div className="absolute -top-12 -right-4 glass-panel p-4 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="w-20 h-2 bg-white/10 rounded mb-2" />
                  <div className="w-12 h-2 bg-primary/40 rounded" />
                </div>

                <div className="absolute -bottom-8 -left-8 glass-panel p-4 rounded-xl animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20" />
                    <div className="space-y-1">
                      <div className="w-16 h-2 bg-white/10 rounded" />
                      <div className="w-10 h-2 bg-accent/40 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-x border-b border-grid-line bg-background/50">
          {[
            { label: "Active Learners", value: "50K+" },
            { label: "Questions Solved", value: "2M+" },
            { label: "AI Accuracy", value: "99.9%" },
            { label: "Subjects Covered", value: "100+" }
          ].map((stat, i) => (
            <div key={i} className={`p-8 border-r border-grid-line last:border-r-0 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-300`}>
              <span className="text-3xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

