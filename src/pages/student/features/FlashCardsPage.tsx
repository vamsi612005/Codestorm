
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Lightbulb } from "lucide-react";
import { API_URL } from "@/lib/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const FlashCardsPage = () => {
    const { id } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const { data: cards, isLoading, error } = useQuery({
        queryKey: ['flashcards', id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/courses/${id}/flashcards`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        }
    });

    if (isLoading) return <div className="text-center p-20 animate-pulse">Loading flashcards...</div>;
    if (error) return <div className="text-center p-20 text-red-400">Error loading flashcards.</div>;
    if (!cards || cards.length === 0) return <div className="text-center p-20">No flashcards available for this course.</div>;

    const currentCard = cards[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 300);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }, 300);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 h-[calc(100vh-100px)] flex flex-col items-center justify-center">
            <div className="w-full flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Study Mode</h2>
                <span className="text-muted-foreground font-mono">{currentIndex + 1} / {cards.length}</span>
            </div>

            <div className="relative w-full aspect-[3/2] perspective-1000 mb-8 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                    {/* Front Side */}
                    <div className="absolute w-full h-full backface-hidden rounded-3xl bg-gradient-to-br from-secondary/50 to-black border border-white/10 p-8 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden">
                        <div className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-6 opacity-80">Term</div>
                        <div className="flex-1 flex items-center justify-center w-full overflow-y-auto custom-scrollbar">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight max-w-full">{currentCard.front}</h3>
                        </div>
                        <p className="mt-6 text-xs text-muted-foreground font-medium">Click to flip</p>
                    </div>

                    {/* Back Side */}
                    <div className="absolute w-full h-full backface-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-black border border-primary/20 p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(45,212,191,0.1)] rotate-y-180 overflow-hidden">
                        <div className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-6 opacity-80">Definition</div>
                        <div className="flex-1 flex items-center justify-center w-full overflow-y-auto custom-scrollbar">
                            <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-full">{currentCard.back}</p>
                        </div>
                        <div className="mt-6 h-4"></div> {/* Spacer for bottom alignment */}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full w-12 h-12">
                    <ChevronLeft className="w-5 h-5" />
                </Button>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full w-12 h-12 text-secondary hover:text-secondary hover:bg-secondary/10">
                            <Lightbulb className="w-6 h-6" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border-white/10">
                        <DialogHeader>
                            <DialogTitle>Here's a hint</DialogTitle>
                            <DialogDescription className="text-lg pt-4 text-white">
                                {currentCard.hint || "No hint available for this card."}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Button variant="ghost" size="icon" onClick={() => setIsFlipped(!isFlipped)} className="rounded-full w-12 h-12">
                    <RotateCcw className="w-5 h-5" />
                </Button>

                <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full w-12 h-12">
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default FlashCardsPage;
