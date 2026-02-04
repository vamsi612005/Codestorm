
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ArrowRight, Trophy } from "lucide-react";
import { API_URL } from "@/lib/api";

const QuizPage = () => {
    const { id } = useParams(); // This is the Course ID
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [streak, setStreak] = useState(0);

    const { data: quiz, isLoading, error } = useQuery({
        queryKey: ['quiz', id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/courses/${id}/quiz`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            if (!res.ok) {
                if (res.status === 404) return null;
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });

    if (isLoading) return <div className="text-center p-20 animate-pulse">Loading your quiz...</div>;
    if (error) return <div className="text-center p-20 text-red-400">Error loading quiz.</div>;
    if (!quiz) return <div className="text-center p-20">No quiz available for this course yet.</div>;

    const question = quiz.questions[currentQuestion];
    const totalQuestions = quiz.questions.length;

    const handleOptionSelect = (index: number) => {
        if (selectedOption !== null) return; // Prevent changing answer
        setSelectedOption(index);

        if (index === question.correctAnswer) {
            setScore(score + 1);
            setStreak(streak + 1);
        } else {
            setStreak(0);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 px-4 animate-fade-in">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <Trophy className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-4xl font-black mb-4">Quiz Completed!</h2>
                <p className="text-2xl mb-8">You scored <span className="text-primary font-bold">{score}</span> out of {totalQuestions}</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => navigate(`/student-app/course/${id}`)} variant="outline">Back to Course</Button>
                    <Button onClick={() => window.location.reload()}>Try Again</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">{quiz.title}</h2>
                    <p className="text-muted-foreground">Question {currentQuestion + 1} of {totalQuestions}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-500 rounded-full font-bold">
                    🔥 {streak} Streak
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-secondary rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }} />
            </div>

            <div className="bg-black/40 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-sm relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

                <h3 className="text-2xl font-semibold mb-8 leading-relaxed">{question.text}</h3>

                <div className="space-y-4">
                    {question.options.map((option: string, idx: number) => {
                        const isSelected = selectedOption === idx;
                        const isCorrect = idx === question.correctAnswer;

                        let optionClass = "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex justify-between items-center ";

                        if (selectedOption === null) {
                            optionClass += "border-white/10 hover:border-primary/50 hover:bg-white/5";
                        } else {
                            if (isSelected && isCorrect) optionClass += "border-green-500 bg-green-500/10 text-green-500";
                            else if (isSelected && !isCorrect) optionClass += "border-red-500 bg-red-500/10 text-red-500";
                            else if (isCorrect) optionClass += "border-green-500 bg-green-500/10 text-green-500";
                            else optionClass += "border-white/5 opacity-50";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                disabled={selectedOption !== null}
                                className={optionClass}
                            >
                                <span className="font-medium">{option}</span>
                                {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                {selectedOption !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                            </button>
                        );
                    })}
                </div>

                {selectedOption !== null && (
                    <div className="mt-8 pt-6 border-t border-white/10 animate-slide-up">
                        {selectedOption !== question.correctAnswer && (
                            <p className="text-red-400 mb-4 font-medium">Incorrect. {question.explanation}</p>
                        )}
                        {selectedOption === question.correctAnswer && (
                            <p className="text-green-400 mb-4 font-medium">Correct! {question.explanation}</p>
                        )}

                        <div className="flex justify-end">
                            <Button onClick={nextQuestion} size="lg" className="gap-2">
                                {currentQuestion + 1 === totalQuestions ? "Finish Quiz" : "Next Question"}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
