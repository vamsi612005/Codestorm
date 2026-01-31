import { Layout, Palette, Zap, MousePointer2 } from "lucide-react";

const ExperienceSection = () => {
    return (
        <section className="py-24 border-b border-grid-line bg-background relative overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">
                        <div>
                            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">User Experience</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Designed for <br /><span className="gradient-text">Flow State</span></h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Neev.AI isn't just a tool; it's an environment. We've stripped away the clutter to focus on what matters: your learning.
                                Our "Visible Grid" design philosophy ensures every tool is exactly where you expect it to be.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: Layout, title: "Visible Grid Layout", desc: "Structured clarity for focused study sessions." },
                                { icon: Palette, title: "Dark Mode Native", desc: "Easy on the eyes for late-night marathons." },
                                { icon: Zap, title: "Instant Feedback", desc: "Micro-interactions that confirm every action." },
                                { icon: MousePointer2, title: "Fluid Navigation", desc: "Move between voice and text seamlessly." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="mt-1">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Abstract UI representation */}
                        <div className="relative z-10 grid grid-cols-2 gap-4 animate-float">
                            <div className="space-y-4 mt-8">
                                <div className="glass-panel p-6 rounded-2xl border-white/10 bg-black/40 backdrop-blur-xl">
                                    <div className="w-8 h-8 rounded-full bg-accent mb-4" />
                                    <div className="h-3 w-24 bg-white/20 rounded mb-2" />
                                    <div className="h-2 w-full bg-white/10 rounded" />
                                </div>
                                <div className="glass-panel p-6 rounded-2xl border-white/10 bg-primary/10 backdrop-blur-xl">
                                    <div className="h-4 w-32 bg-primary/40 rounded mb-4" />
                                    <div className="flex gap-2">
                                        <div className="h-8 w-8 rounded bg-primary/20" />
                                        <div className="h-8 w-full bg-primary/10 rounded" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="glass-panel p-6 rounded-2xl border-white/10 bg-secondary/50 backdrop-blur-xl h-48 flex flex-col justify-end">
                                    <div className="w-full h-24 bg-gradient-to-t from-primary/20 to-transparent rounded-xl border border-primary/20" />
                                </div>
                                <div className="glass-panel p-6 rounded-2xl border-white/10 bg-black/40 backdrop-blur-xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="h-3 w-12 bg-white/20 rounded" />
                                        <div className="h-3 w-3 bg-green-400 rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-white/10 rounded" />
                                        <div className="h-2 w-2/3 bg-white/10 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-[80px] -z-10" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
