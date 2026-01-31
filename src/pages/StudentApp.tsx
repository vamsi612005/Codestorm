
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, Calendar, Settings, Bell, BookOpen, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentApp = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-grid-line bg-secondary/30 p-6 flex flex-col hidden lg:flex">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Neev.AI</span>
                </div>

                <nav className="space-y-2 flex-1">
                    {[
                        { icon: LayoutDashboard, label: "Dashboard", active: true },
                        { icon: BookOpen, label: "My Courses" },
                        { icon: Calendar, label: "Schedule" },
                        { icon: Bell, label: "Notifications" },
                        { icon: Settings, label: "Settings" },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20">
                        <h4 className="font-bold text-white mb-1">Premium Plan</h4>
                        <p className="text-xs text-muted-foreground mb-3">Expires in 12 days</p>
                        <Button size="sm" variant="secondary" className="w-full text-xs">Upgrade</Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="border-b border-grid-line p-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Welcome back, Student</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary border border-white/10" />
                    </div>
                </header>

                <div className="p-8 flex flex-col items-center justify-center min-h-[600px] text-center max-w-lg mx-auto">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <LayoutDashboard className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Student Dashboard</h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                        This is the authenticated area for students. Your courses, quizzes, and progress tracking would appear here.
                    </p>
                    <Button onClick={() => navigate("/")} variant="outline" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StudentApp;
