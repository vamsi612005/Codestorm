import { useNavigate } from "react-router-dom";
import { ArrowLeft, LayoutDashboard, Calendar, Settings, Bell, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Course } from "@/types/api";
import { getIcon } from "@/utils/iconMap";

const StudentApp = () => {
    const navigate = useNavigate();

    const { data: courses, isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: api.getCourses
    });

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

                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-black mb-2">Student Dashboard</h2>
                        <p className="text-muted-foreground text-lg">Select a subject to start learning.</p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20 text-muted-foreground">Loading specific subjects...</div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-400">Error loading subjects. Is the backend running?</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {courses?.map((course: Course) => {
                                const Icon = getIcon(course.icon);
                                return (
                                    <div
                                        key={course._id}
                                        onClick={() => navigate(`/student-app/subject/${course._id}`)}
                                        className="group bg-secondary/30 border border-white/5 hover:border-primary/50 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors`}>
                                                <Icon className={`w-6 h-6 ${course.color || 'text-primary'}`} />
                                            </div>
                                            <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-muted-foreground">
                                                {course.progress}%
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-2">{course.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentApp;
