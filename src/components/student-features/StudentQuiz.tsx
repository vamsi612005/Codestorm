import { useState } from "react";
import { CheckCircle2, XCircle, Timer, Award, RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Quiz } from "@/types/api";
import { Button } from "@/components/ui/button";

interface StudentQuizProps {
    courseId: string;
}

export const StudentQuiz = ({ courseId }: StudentQuizProps) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);

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

    const restartQuiz = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setIsFinished(false);
        setUserAnswers([]);
        setSelected(null);
    };

    if (isFinished) {
        return (
            <div className="h-full w-full flex items-center justify-center p-4">
                <div className="glass-panel w-full max-w-2xl rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[80vh] flex flex-col">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 border border-primary/50">
                            <Award className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2">Quiz Completed!</h2>
                        <p className="text-xl text-muted-foreground">
                            You scored <span className="text-primary font-bold">{score}</span> out of <span className="text-white font-bold">{quiz.questions.length}</span>
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4 space-y-6">
                        {quiz.questions.map((q, idx) => {
                            const userAnswer = userAnswers[idx];
                            const isCorrect = userAnswer === q.correctAnswer;
                            return (
                                <div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-3">{q.text}</h4>

                                            <div className="space-y-2 mb-4">
                                                <div className={`p-3 rounded-lg text-sm border flex items-center justify-between ${isCorrect ? 'bg-green-500/10 border-green-500/30 text-green-200' : 'bg-red-500/10 border-red-500/30 text-red-200'}`}>
                                                    <span>
                                                        <span className="opacity-60 mr-2">Your Answer:</span>
                                                        {q.options[userAnswer]}
                                                    </span>
                                                    {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                </div>

                                                {!isCorrect && (
                                                    <div className="p-3 rounded-lg text-sm bg-green-500/10 border border-green-500/30 text-green-200 flex items-center justify-between">
                                                        <span>
                                                            <span className="opacity-60 mr-2">Correct Answer:</span>
                                                            {q.options[q.correctAnswer]}
                                                        </span>
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>

                                            {q.explanation && (
                                                <div className="text-sm text-gray-400 italic bg-black/20 p-3 rounded-lg border border-white/5">
                                                    <strong>Explanation:</strong> {q.explanation}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/10 flex justify-center">
                        <Button onClick={restartQuiz} className="gap-2">
                            <RefreshCcw className="w-4 h-4" /> Retry Quiz
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    const handleOptionClick = (index: number) => {
        if (selected !== null) return; // Prevent changing answer
        setSelected(index);

        // Record answer
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = index;
        setUserAnswers(newAnswers);

        if (index === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }

        // Auto advance after delay
        setTimeout(() => {
            if (currentQuestionIndex < quiz.questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelected(null);
            } else {
                setIsFinished(true);
            }
        }, 2000); // 2 second delay to see feedback
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
