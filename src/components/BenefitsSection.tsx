import { Rocket, Brain, Clock, Shield } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="py-24 border-b border-grid-line bg-background relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Why Neev.AI?</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Built for the <span className="gradient-text-accent">Modern Student</span></h2>
          <p className="text-muted-foreground text-lg">
            Traditional studying is passive. Neev.AI makes it active, engaging, and hyper-efficient.
            Stop memorizing, start understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Brain,
              title: "Adaptive Growth",
              desc: "The more you use it, the better it understands your weak spots.",
              color: "text-primary"
            },
            {
              icon: Clock,
              title: "Save Time",
              desc: "Generate quizzes and flashcards in seconds, not hours.",
              color: "text-accent"
            },
            {
              icon: Rocket,
              title: "Boost Retention",
              desc: "Active recall and spaced repetition are built into the core.",
              color: "text-blue-400"
            },
            {
              icon: Shield,
              title: "Curriculum Safe",
              desc: "Upload your specific syllabus to stay strictly on topic.",
              color: "text-green-400"
            }
          ].map((item, i) => (
            <div key={i} className="group p-8 border border-grid-line hover:border-primary/50 bg-black/20 hover:bg-black/40 transition-all duration-300 rounded-2xl relative overflow-hidden">
              <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>

              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
