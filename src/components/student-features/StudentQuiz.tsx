import { useState } from "react";
import { CheckCircle2, XCircle, Timer, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Quiz } from "@/types/api";

interface StudentQuizProps {
    courseId: string;
}

export const StudentQuiz = ({ courseId }: StudentQuizProps) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const { data: quiz, isLoading } = useQuery({
        queryKey: ['quiz', courseId],
        queryFn: () => api.getQuiz(courseId),
        enabled: !!courseId
    });

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Loading quiz...</div>;

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="h-full w-full flex items-center justify-center p-4">
                <div className="glass-panel w-full max-w-xl rounded-2xl p-8 border border-white/10 shadow-2xl text-center">
                    <h3 className="text-xl font-bold text-white mb-2">No Quiz Available</h3>
                    <p className="text-muted-foreground">There are no quizzes for this subject yet.</p>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    const handleOptionClick = (index: number) => {
        if (selected !== null) return; // Prevent changing answer
        setSelected(index);

        if (index === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }

        // Auto advance after delay
        setTimeout(() => {
            if (currentQuestionIndex < quiz.questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelected(null);
            }
        }, 2000);
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">

                {/* Progress Bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full mb-6 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-primary to-blue-500 h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm">
                        <span className="font-bold">{quiz.title}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400 font-bold text-sm">
                        <Award className="w-4 h-4" />
                        <span>Score: {score}</span>
                    </div>
                </div>

                {/* Question */}
                <h3 className="text-xl font-bold text-white mb-6">
                    {currentQuestion.text}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                    {currentQuestion.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleOptionClick(i)}
                            disabled={selected !== null}
                            className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 group
                                ${selected === i
                                    ? (i === currentQuestion.correctAnswer
                                        ? 'bg-primary/20 border-primary/50 text-primary'
                                        : 'bg-red-500/20 border-red-500/50 text-red-200')
                                    : (selected !== null && i === currentQuestion.correctAnswer)
                                        ? 'bg-primary/20 border-primary/50 text-primary' // Show correct answer if wrong selected
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                                }
                            `}
                        >
                            <span className="font-medium">{opt}</span>
                            {selected === i && (
                                i === currentQuestion.correctAnswer
                                    ? <CheckCircle2 className="w-5 h-5 text-primary" />
                                    : <XCircle className="w-5 h-5 text-red-400" />
                            )}
                            {selected !== i && (selected === null || i !== currentQuestion.correctAnswer) && (
                                <div className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-primary/50 transition-colors" />
                            )}
                            {selected !== null && i === currentQuestion.correctAnswer && selected !== i && (
                                <CheckCircle2 className="w-5 h-5 text-primary opacity-50" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Explanation (if answered) */}
                {selected !== null && currentQuestion.explanation && (
                    <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-200 animate-in fade-in">
                        <strong>Explanation:</strong> {currentQuestion.explanation}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 text-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">
                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </span>
                </div>
            </div>
        </div>
    );
};
