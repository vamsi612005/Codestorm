import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { ReactNode } from "react";

interface KeynoteModalProps {
    children?: ReactNode;
}

const KeynoteModal = ({ children }: KeynoteModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="hero-outline" size="xl" className="group">
                        <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                        Watch Keynote
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-black/90 border-white/10 backdrop-blur-xl p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold text-white">Neev.AI Keynote 2025</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full bg-black relative flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                    {/* Placeholder for Video */}
                    <img
                        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
                        alt="Keynote Thumbnail"
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-500"
                    />

                    <div className="absolute z-20 w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(45,212,191,0.5)]">
                            <Play className="w-8 h-8 text-black fill-current ml-1" />
                        </div>
                    </div>

                    <p className="absolute bottom-6 left-6 z-20 text-white font-medium">Introducing Autonomous Learning</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default KeynoteModal;
