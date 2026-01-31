import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-grid-line bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 border-x border-grid-line">
          {/* Logo */}
          <div className="col-span-3 flex items-center gap-3 border-r border-grid-line px-6 py-4">
            <div className="feature-icon !w-10 !h-10 !rounded-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tight">Neev<span className="text-primary">.AI</span></span>
          </div>

          {/* Nav Links */}
          <div className="col-span-6 flex items-center justify-center gap-1 border-r border-grid-line px-6 py-4">
            {["Features", "How it Works", "Pricing", "About"].map((item) => (
              <Button key={item} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                {item}
              </Button>
            ))}
          </div>

          {/* CTA */}
          <div className="col-span-3 flex items-center justify-end gap-3 px-6 py-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
