import { Phone, MessageSquare, HelpCircle, Bot, FileQuestion, Layers, Sparkles } from "lucide-react";
import PhoneCallDemo from "./demo/PhoneCallDemo";
import LiveAssistantDemo from "./demo/LiveAssistantDemo";
import QuizDemo from "./demo/QuizDemo";
import RagChatDemo from "./demo/RagChatDemo";
import QuestionGenDemo from "./demo/QuestionGenDemo";
import FlashCardDemo from "./demo/FlashCardDemo";

const features = [
  {
    icon: Phone,
    title: "AI Phone Calling",
    description: "Get personalized tutoring sessions through voice calls. Our AI adapts to your learning pace.",
    component: <PhoneCallDemo />,
    colSpan: "col-span-12 lg:col-span-6",
  },
  {
    icon: MessageSquare,
    title: "Live AI Assistant",
    description: "Real-time help whenever you need it.",
    component: <LiveAssistantDemo />,
    colSpan: "col-span-12 lg:col-span-6",
  },
  {
    icon: HelpCircle,
    title: "Smart Quizzes",
    description: "Adaptive quizzes that identify your weak spots.",
    component: <QuizDemo />,
    colSpan: "col-span-12 lg:col-span-4",
  },
  {
    icon: Bot,
    title: "RAG Chatbot",
    description: "Chat with your study materials contextually.",
    component: <RagChatDemo />,
    colSpan: "col-span-12 lg:col-span-4",
  },
  {
    icon: FileQuestion,
    title: "Question Generator",
    description: "Generate exam-style questions instantly.",
    component: <QuestionGenDemo />,
    colSpan: "col-span-12 lg:col-span-4",
  },
  {
    icon: Layers,
    title: "Flash Cards",
    description: "AI-generated flashcards with spaced repetition.",
    component: <FlashCardDemo />,
    colSpan: "col-span-12 lg:col-span-12",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 border-b border-grid-line bg-background relative" id="core-features">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto">
        <div className="border border-grid-line bg-background/50 backdrop-blur-sm">
          {/* Section Header */}
          <div className="grid grid-cols-12 border-b border-grid-line">
            <div className="col-span-12 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-grid-line p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">Core Features</span>
                <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                  Everything You Need to
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Excellence</span>
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Neev.AI provides a comprehensive suite of intelligent tools designed to cover every aspect of your learning journey.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8 p-8 lg:p-12 flex items-center bg-grid-pattern relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
              <div className="relative z-20 flex gap-4 overflow-hidden">
                <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm font-medium text-white whitespace-nowrap">
                  <Sparkles className="w-4 h-4 inline mr-2 text-primary" />
                  Adaptive Learning
                </div>
                <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm font-medium text-white whitespace-nowrap">
                  <Bot className="w-4 h-4 inline mr-2 text-accent" />
                  24/7 Availability
                </div>
                <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm font-medium text-white whitespace-nowrap">
                  <Layers className="w-4 h-4 inline mr-2 text-blue-400" />
                  Multi-Modal
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-12">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`${feature.colSpan} border-b lg:border-r border-grid-line last:border-0 relative group overflow-hidden`}
              >
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-500" />

                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                        <feature.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">{feature.description}</p>
                    </div>
                  </div>

                  {/* Demo Component Container */}
                  <div className="mt-auto relative z-10 w-full rounded-2xl overflow-hidden border border-white/5 bg-black/20 shadow-inner group-hover:shadow-[0_0_40px_rgba(45,212,191,0.1)] transition-all duration-500">
                    <div className="transform scale-[0.9] origin-center group-hover:scale-[0.95] transition-transform duration-500">
                      {feature.component}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
