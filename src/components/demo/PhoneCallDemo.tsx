import { Phone, Mic, PhoneOff, Activity } from "lucide-react";
import { useState, useEffect } from "react";

const PhoneCallDemo = () => {
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-sm rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />

                <div className="p-8 flex flex-col items-center h-[500px] justify-between relative z-10">

                    {/* Header */}
                    <div className="text-center space-y-2 mt-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-primary/50 to-transparent p-[2px] mb-4 mx-auto animate-pulse-soft">
                            <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Neev" alt="AI Agent" className="w-16 h-16" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Neev AI</h3>
                        <p className="text-primary font-medium">{formatTime(duration)}</p>
                    </div>

                    {/* Visualizer */}
                    <div className="flex items-center gap-1 h-12 w-full justify-center opacity-80">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 bg-primary rounded-full animate-pulse"
                                style={{
                                    height: `${Math.random() * 100}%`,
                                    animationDuration: `${0.5 + Math.random() * 0.5}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6 mb-8">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`p-4 rounded-full transition-all duration-300 ${isMuted ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            <Mic className={`w-6 h-6 ${isMuted ? 'fill-current' : ''}`} />
                        </button>

                        <button className="p-5 rounded-full bg-destructive text-white shadow-lg shadow-destructive/30 hover:bg-destructive/90 transition-all hover:scale-105 active:scale-95">
                            <PhoneOff className="w-8 h-8 fill-current" />
                        </button>

                        <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
                            <span className="sr-only">Speaker</span>
                            <Activity className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneCallDemo;
