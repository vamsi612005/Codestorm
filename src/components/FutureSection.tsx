import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

const FutureSection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-32 border-b border-grid-line relative overflow-hidden flex flex-col items-center justify-center text-center" id="future">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto relative z-10 px-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-8">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-accent uppercase tracking-wider">The Future is Autonomous</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                    Learning on <br /><span className="text-white">Autopilot</span>
                </h2>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                    Imagine a tutor that knows you better than you know yourself.
                    Neev.AI is building towards a future where your education is purely personalized,
                    continuously adapting to your goals, career aspirations, and cognitive style.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="xl" variant="hero" className="btn-glow px-12" onClick={() => navigate("/student-app")}>
                        Get Early Access <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FutureSection;
