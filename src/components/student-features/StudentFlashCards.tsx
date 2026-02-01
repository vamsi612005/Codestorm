import { RotateCw, ThumbsUp, ThumbsDown, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Flashcard } from "@/types/api";

interface StudentFlashCardsProps {
    courseId: string;
}

export const StudentFlashCards = ({ courseId }: StudentFlashCardsProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data: flashcards, isLoading } = useQuery({
        queryKey: ['flashcards', courseId],
        queryFn: () => api.getFlashcards(courseId),
        enabled: !!courseId
    });

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Loading flashcards...</div>;

    if (!flashcards || flashcards.length === 0) {
        return (
            <div className="h-full w-full flex items-center justify-center p-4">
                <div className="glass-panel w-full max-w-sm rounded-2xl p-8 border border-white/10 shadow-2xl text-center">
                    <h3 className="text-xl font-bold text-white mb-2">No Flashcards</h3>
                    <p className="text-muted-foreground">There are no flashcards available for this subject.</p>
                </div>
            </div>
        );
    }

    const currentCard = flashcards[currentIndex];

    const nextCard = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcards.length);
        }, 200);
    };

    const prevCard = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        }, 200);
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            <div className="flex items-center gap-4 mb-4">
                <button onClick={prevCard} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-sm text-muted-foreground font-mono">
                    {currentIndex + 1} / {flashcards.length}
                </span>
                <button onClick={nextCard} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            <div className="perspective-1000 w-full flex justify-center">
                <div
                    className="relative w-full max-w-sm h-64 transition-transform duration-500 transform-style-3d cursor-pointer group"
                    onClick={() => setIsFlipped(!isFlipped)}
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden">
                        <div className="glass-panel w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center border border-white/10 shadow-xl group-hover:border-primary/30 transition-colors">
                            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Tap to reveal</span>
                            <h3 className="text-2xl font-black text-white text-center select-none">{currentCard.front}</h3>
                            {currentCard.hint && (
                                <p className="text-muted-foreground mt-4 text-xs italic opacity-50">Hint: {currentCard.hint}</p>
                            )}
                        </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                        <div className="glass-panel w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center border border-primary/20 shadow-xl bg-primary/5">
                            <h3 className="text-xl font-bold text-white mb-2 text-center select-none">{currentCard.back}</h3>

                            <div className="mt-6 flex gap-4 w-full justify-center" onClick={(e) => e.stopPropagation()}>
                                <button className="p-2 rounded-full bg-slate-500/20 text-slate-400 hover:bg-slate-500/40 transition-colors">
                                    <ThumbsDown className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/40 transition-colors">
                                    <ThumbsUp className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
