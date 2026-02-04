
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Phone, MessageSquare, HelpCircle, Bot, FileQuestion, Layers, ArrowLeft, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";

const features = [
    {
        id: "phone",
        icon: Phone,
        title: "AI Phone Calling",
        description: "Voice-based tutoring session.",
        color: "text-primary",
        bg: "bg-primary/10",
        action: "popup"
    },
    {
        id: "assistant",
        icon: MessageSquare,
        title: "Live Assistant",
        description: "Real-time human/AI help.",
        color: "text-primary",
        bg: "bg-primary/10",
        action: "redirect",
        url: "https://live-api-web-console-main-tau.vercel.app/"
    },
    {
        id: "quiz",
        icon: HelpCircle,
        title: "Quiz",
        description: "Test your knowledge.",
        color: "text-primary",
        bg: "bg-primary/10",
        action: "navigate",
        path: "quiz"
    },
    {
        id: "rag",
        icon: FileQuestion,
        title: "RAG Chatbot",
        description: "Document-based Q&A.",
        color: "text-primary",
        bg: "bg-primary/10",
        action: "navigate",
        path: "rag"
    },
    {
        id: "paper-gen",
        icon: Layers,
        title: "Question Paper Generator",
        description: "Create practice exams.",
        color: "text-primary",
        bg: "bg-primary/10",
        action: "navigate",
        path: "paper-gen"
    },
    {
        id: "flashcards",
        icon: Layers,
        title: "Flash Cards",
        description: "Memorize key concepts.",
        color: "text-primary",
        bg: "bg-primary/10",
        action: "navigate",
        path: "flashcards"
    }
];

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: course, isLoading, error } = useQuery({
        queryKey: ['course', id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/courses/${id}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        }
    });

    const handleAction = (feature: typeof features[0]) => {
        if (feature.action === "navigate") {
            navigate(`/student-app/course/${id}/${feature.path}`);
        } else if (feature.action === "redirect" && feature.url) {
            window.location.href = feature.url;
        }
    };

    if (isLoading) return <div className="text-center p-20 animate-pulse">Loading course details...</div>;
    if (error) return <div className="text-center p-20 text-red-400">Error loading course details.</div>;
    if (!course) return <div className="text-center p-20">Course not found.</div>;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <Button onClick={() => navigate("/student-app")} variant="ghost" className="mb-8 hover:bg-white/5">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>

            <div className="mb-10">
                <h2 className="text-4xl font-black mb-2">{course.title}</h2>
                <p className="text-muted-foreground">{course.level} • Course ID: {id}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => {
                    if (feature.action === "popup") {
                        return (
                            <Dialog key={feature.id}>
                                <DialogTrigger asChild>
                                    <div className="group bg-black/40 border border-white/5 rounded-2xl p-8 hover:bg-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer text-left">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}>
                                            <feature.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                    <DialogHeader>
                                        <DialogTitle>Call AI Tutor</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                            <Phone className="w-10 h-10 text-primary" />
                                        </div>
                                        <p className="text-lg font-medium mb-2">Connecting to {course.title} Tutor...</p>
                                        <p className="text-3xl font-black text-white tracking-widest">+1 754-254-3586</p>
                                        <p className="text-xs text-muted-foreground mt-4">Standard rates may apply</p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        );
                    }

                    return (
                        <div
                            key={feature.id}
                            onClick={() => handleAction(feature)}
                            className="group bg-black/40 border border-white/5 rounded-2xl p-8 hover:bg-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            {feature.action === "redirect" && (
                                <div className="absolute top-4 right-4 text-muted-foreground group-hover:text-white transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            )}

                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseDetail;
