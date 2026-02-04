
import { useNavigate } from "react-router-dom";
import { Book, ChevronRight, Calculator, FlaskConical, Globe, Code, Music, Palette, Bitcoin, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/api";

// Icon mapping helper
const getIcon = (name: string) => {
    const icons: Record<string, any> = { Calculator, Activity, FlaskConical, Globe, Code, Book, Music, Palette, Bitcoin };
    return icons[name] || Book;
};

const MyCourses = () => {
    const navigate = useNavigate();

    const { data: courses, isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/courses`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        }
    });

    if (isLoading) return <div className="text-center p-20 animate-pulse">Loading amazing courses...</div>;
    if (error) return <div className="text-center p-20 text-red-400">Error loading courses. Please try again.</div>;

    return (
        <div className="max-w-7xl mx-auto animation-fade-in">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
                <div className="text-sm text-muted-foreground">Enrolled Courses • Spring 2026</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course: any) => {
                    const Icon = getIcon(course.icon);
                    return (
                        <div
                            key={course._id}
                            onClick={() => navigate(`/student-app/course/${course._id}`)}
                            className="group relative bg-black/40 border border-white/5 rounded-2xl p-6 hover:bg-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full">
                                <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                            </div>

                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                                    {course.level}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{course.description}</p>

                            <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                Continue Learning <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyCourses;
