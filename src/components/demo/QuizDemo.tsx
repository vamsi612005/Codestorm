import { useState } from "react";
import { CheckCircle2, XCircle, Timer, Award } from "lucide-react";

const QuizDemo = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const options = [
        { id: 1, text: "d/dx (x²)", isCorrect: false },
        { id: 2, text: "2x", isCorrect: true },
        { id: 3, text: "x", isCorrect: false },
        { id: 4, text: "2", isCorrect: false },
    ];

    return (
        <div className="h-full w-full flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-sm rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">

                {/* Progress Bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full mb-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-accent h-full w-[65%]" />
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm">
                        <Timer className="w-4 h-4" />
                        <span>00:15</span>
                    </div>
                    <div className="flex items-center gap-1 text-accent font-bold text-sm">
                        <Award className="w-4 h-4" />
                        <span>Streak: 4</span>
                    </div>
                </div>

                {/* Question */}
                <h3 className="text-xl font-bold text-white mb-6">
                    What is the derivative of <span className="font-mono text-primary">f(x) = x²</span>?
                </h3>

                {/* Options */}
                <div className="space-y-3">
                    {options.map((opt, i) => (
                        <button
                            key={opt.id}
                            onClick={() => setSelected(opt.id)}
                            className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 group
                ${selected === opt.id
                                    ? (opt.isCorrect
                                        ? 'bg-green-500/20 border-green-500/50 text-green-200'
                                        : 'bg-red-500/20 border-red-500/50 text-red-200')
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                                }
              `}
                        >
                            <span className="font-medium">{opt.text}</span>
                            {selected === opt.id && (
                                opt.isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />
                            )}
                            {selected !== opt.id && (
                                <div className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-primary/50 transition-colors" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Question 6 of 10</span>
                </div>
            </div>
        </div>
    );
};

export default QuizDemo;
