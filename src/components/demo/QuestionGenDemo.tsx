import { FilePlus, Sliders, Check } from "lucide-react";
import { useState } from "react";

const QuestionGenDemo = () => {
    const [isGenerated, setIsGenerated] = useState(false);

    return (
        <div className="h-full w-full flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                {!isGenerated ? (
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                <Sliders className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Generate Paper</h3>
                                <p className="text-xs text-muted-foreground">Customize your exam</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 mb-1.5 block">Subject</label>
                                <div className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white">
                                    Physics - Thermodynamics
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1.5 block">Difficulty</label>
                                    <div className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white flex justify-between">
                                        <span>Hard</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1.5 block">Questions</label>
                                    <div className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white">
                                        20
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsGenerated(true)}
                            className="w-full py-3 bg-gradient-to-r from-primary to-emerald-500 rounded-xl text-black font-bold mt-2 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                        >
                            Generate Paper
                        </button>
                    </div>
                ) : (
                    <div className="p-6 bg-white/5 h-full min-h-[380px] flex flex-col relative">
                        <div className="absolute top-4 right-4 text-green-400 flex items-center gap-1 text-xs font-medium bg-green-400/10 px-2 py-1 rounded">
                            <Check className="w-3 h-3" /> Ready
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-white mb-1">Physics Final</h3>
                            <p className="text-xs text-muted-foreground">Generated in 1.2s</p>
                        </div>

                        <div className="flex-1 space-y-3 opacity-75">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2 pb-3 border-b border-white/5 last:border-0">
                                    <div className="h-2 bg-white/20 rounded w-3/4" />
                                    <div className="h-2 bg-white/10 rounded w-1/2" />
                                    <div className="h-2 bg-white/10 rounded w-5/6" />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsGenerated(false)}
                            className="w-full py-3 bg-white/10 text-white rounded-xl mt-4 hover:bg-white/20 transition-colors text-sm font-medium"
                        >
                            Start New Test
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionGenDemo;
