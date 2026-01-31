import { Sparkles } from "lucide-react";

const Footer = () => {
  const links = {
    Product: ["Features", "Pricing", "Integrations", "API"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Documentation", "Help Center", "Community", "Tutorials"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
  };

  return (
    <footer className="border-b border-grid-line">
      <div className="container mx-auto">
        <div className="border-x border-grid-line">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-12 border-b border-grid-line">
            {/* Brand Column */}
            <div className="col-span-12 lg:col-span-4 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-grid-line">
              <div className="flex items-center gap-3 mb-6">
                <div className="feature-icon !w-10 !h-10 !rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">StudyAI</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-xs">
                The intelligent learning companion that adapts to you. Study smarter, learn faster.
              </p>
              <div className="flex gap-4">
                {["twitter", "github", "linkedin", "discord"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-lg border border-grid-line flex items-center justify-center hover:bg-secondary hover:border-primary/50 transition-all"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-muted-foreground rounded-sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {Object.entries(links).map(([category, items], idx) => (
                  <div
                    key={category}
                    className={`p-8 ${
                      idx < 3 ? "border-r border-grid-line" : ""
                    } ${idx < 2 ? "border-b md:border-b-0 border-grid-line" : ""}`}
                  >
                    <h4 className="font-semibold mb-4">{category}</h4>
                    <ul className="space-y-3">
                      {items.map((link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6 p-6 border-b lg:border-b-0 lg:border-r border-grid-line">
              <p className="text-sm text-muted-foreground">
                © 2024 StudyAI. All rights reserved.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6 p-6 flex items-center justify-start lg:justify-end gap-6">
              <span className="text-sm text-muted-foreground">
                Made with <span className="text-accent">♥</span> for students everywhere
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
