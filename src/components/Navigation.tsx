import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: "Features", id: "core-features" },
    { label: "Experience", id: "experience" },
    { label: "Benefits", id: "benefits" },
    { label: "Future", id: "future" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-grid-line bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 border-x border-grid-line">
          {/* Logo */}
          <div
            className="col-span-3 flex items-center gap-3 border-r border-grid-line px-6 py-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="feature-icon !w-10 !h-10 !rounded-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tight">Neev<span className="text-primary">.AI</span></span>
          </div>

          {/* Nav Links */}
          <div className="col-span-6 flex items-center justify-center gap-1 border-r border-grid-line px-6 py-4 hidden lg:flex">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* CTA */}
          <div className="col-span-9 lg:col-span-3 flex items-center justify-end gap-3 px-6 py-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/student-app")}>
              Sign In
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/student-app")}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
