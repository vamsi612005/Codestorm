import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageSquare, HelpCircle, Bot, FileQuestion, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getIcon } from "@/utils/iconMap";
import { StudentQuiz } from "@/components/student-features/StudentQuiz";
import { StudentRagChat } from "@/components/student-features/StudentRagChat";
import { StudentQuestionGen } from "@/components/student-features/StudentQuestionGen";
import { StudentFlashCards } from "@/components/student-features/StudentFlashCards";

export const SubjectDetail = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const [activeFeature, setActiveFeature] = useState<string | null>(null);
    const [isPhoneOpen, setIsPhoneOpen] = useState(false);

    const { data: subject, isLoading } = useQuery({
        queryKey: ['course', subjectId],
        queryFn: () => api.getCourse(subjectId!),
        enabled: !!subjectId
    });

    if (isLoading) return <div className="p-8 text-center">Loading subject...</div>;
    if (!subject) return <div className="p-8 text-center">Subject not found</div>;

    const Icon = getIcon(subject.icon);

    const handleFeatureClick = (featureTitle: string) => {
        if (featureTitle === "AI Phone Calling") {
            setIsPhoneOpen(true);
        } else if (featureTitle === "Live Assistant") {
            window.open("http://10.10.8.6:8080/", "_blank");
        } else {
            setActiveFeature(featureTitle);
        }
    };

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case "Smart Quizzes": return <StudentQuiz courseId={subject._id} />;
            case "RAG Chatbot": return <StudentRagChat />;
            case "Question Generator": return <StudentQuestionGen />;
            case "Flash Cards": return <StudentFlashCards courseId={subject._id} />;
            default: return null;
        }
    };

    const features = [
        { icon: Phone, title: "AI Phone Calling", desc: "Voice tutoring" },
        { icon: MessageSquare, title: "Live Assistant", desc: "Real-time help" },
        { icon: HelpCircle, title: "Smart Quizzes", desc: "Test knowledge" },
        { icon: Bot, title: "RAG Chatbot", desc: "Chat with docs" },
        { icon: FileQuestion, title: "Question Generator", desc: "Create exams" },
        { icon: Layers, title: "Flash Cards", desc: "Memorize faster" },
    ];

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => activeFeature ? setActiveFeature(null) : navigate("/student-app")}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Icon className="w-6 h-6 text-primary" />
                        {subject.title}
                    </h1>
                    <p className="text-muted-foreground text-sm">{subject.description}</p>
                </div>
            </div>

            {activeFeature ? (
                <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">{activeFeature}</h2>
                        <Button variant="outline" size="sm" onClick={() => setActiveFeature(null)}>Close Feature</Button>
                    </div>
                    {renderFeatureContent()}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature) => (
                        <button
                            key={feature.title}
                            onClick={() => handleFeatureClick(feature.title)}
                            className="bg-secondary/30 border border-white/5 hover:bg-white/5 hover:border-primary/50 p-6 rounded-2xl transition-all text-left flex flex-col group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.desc}</p>
                        </button>
                    ))}
                </div>
            )}

            <Dialog open={isPhoneOpen} onOpenChange={setIsPhoneOpen}>
                <DialogContent className="glass-panel border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle>AI Phone Tutor</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Connect with an AI tutor instantly via voice call.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-8 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-pulse">
                            <Phone className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-lg font-mono mb-2">+1 754-254-3586</p>
                        <p className="text-sm text-gray-400">Available 24/7 for {subject.title} support</p>
                        <Button className="mt-6 w-full gap-2" asChild>
                            <a href="tel:+17542543586">
                                <Phone className="w-4 h-4" /> Call Now
                            </a>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
