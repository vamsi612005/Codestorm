
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Settings, Bell, BookOpen, GraduationCap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-grid-line bg-secondary/30 p-6 flex flex-col hidden lg:flex fixed h-full top-0 left-0 bottom-0 z-40 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate("/")}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Neev.AI</span>
                </div>

                <nav className="space-y-2 flex-1">
                    {[
                        { icon: LayoutDashboard, label: "Dashboard", path: "/student-app" },
                        { icon: BookOpen, label: "My Courses", path: "/student-app" }, // Simplified for demo
                        { icon: Calendar, label: "Schedule", path: "/student-app/schedule" },
                        { icon: Bell, label: "Notifications", path: "/student-app/notifications" },
                        { icon: Settings, label: "Settings", path: "/student-app/settings" },
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive(item.path) && item.path !== "/student-app" // Basic check
                                    ? 'bg-primary/10 text-primary font-semibold shadow-[0_0_20px_rgba(45,212,191,0.1)]'
                                    : item.label === "Dashboard" && location.pathname === "/student-app"
                                        ? 'bg-primary/10 text-primary font-semibold shadow-[0_0_20px_rgba(45,212,191,0.1)]'
                                        : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <h4 className="font-bold text-white mb-1 relative z-10">Premium Plan</h4>
                        <p className="text-xs text-muted-foreground mb-3 relative z-10">Expires in 12 days</p>
                        <Button size="sm" variant="secondary" className="w-full text-xs relative z-10 hover:bg-accent hover:text-white transition-colors">Upgrade</Button>
                    </div>

                    <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive transition-colors text-sm font-medium">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                {/* Header */}
                <header className="border-b border-grid-line bg-background/80 backdrop-blur-xl sticky top-0 z-30 px-8 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Welcome back, Student</h1>
                        <p className="text-xs text-muted-foreground">Let's learn something new today</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
                        </Button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-black border border-white/10 flex items-center justify-center text-xs font-bold ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer">
                            ST
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8 flex-1 overflow-auto bg-grid-pattern bg-fixed">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default StudentLayout;
