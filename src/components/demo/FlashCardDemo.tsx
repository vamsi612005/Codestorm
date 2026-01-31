import { RotateCw, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const FlashCardDemo = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="h-full w-full flex items-center justify-center p-4 perspective-1000">
            <div
                className="relative w-full max-w-sm h-64 transition-transform duration-500 transform-style-3d cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden">
                    <div className="glass-panel w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center border border-white/10 shadow-xl group-hover:border-primary/30 transition-colors">
                        <span className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Chemistry • Periodic Table</span>
                        <h3 className="text-3xl font-black text-white text-center">Au</h3>
                        <p className="text-muted-foreground mt-4 text-sm">Tap to flip</p>
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                    <div className="glass-panel w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center border border-primary/20 shadow-xl bg-primary/5">
                        <h3 className="text-2xl font-bold text-white mb-2">Gold</h3>
                        <p className="text-center text-gray-300 text-sm mb-6">A dense, soft, malleable, and ductile metal used in jewelry and electronics.</p>

                        <div className="flex gap-4 w-full justify-center" onClick={(e) => e.stopPropagation()}>
                            <button className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                                <ThumbsDown className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/40 transition-colors">
                                <HelpCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/40 transition-colors">
                                <ThumbsUp className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashCardDemo;
