import { FileText, Paperclip, Send, Search } from "lucide-react";

export const StudentRagChat = () => {
    return (
        <div className="h-full w-full flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[600px]">
                {/* Document Header */}
                <div className="p-3 bg-white/5 border-b border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white text-sm truncate">Introduction to Quantum Physics.pdf</h3>
                        <p className="text-xs text-muted-foreground">3.4 MB • 24 Pages</p>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                    {/* Context Citation */}
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-xs">
                        <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                            <Search className="w-3 h-3" />
                            <span>Found context in Page 4, 12</span>
                        </div>
                        <p className="text-gray-400 italic">"...quantum superposition states that a particle exists in all possible states simultaneously..."</p>
                    </div>

                    <div className="flex gap-3 flex-row-reverse">
                        <div className="p-3 rounded-2xl rounded-tr-none bg-primary text-primary-foreground text-sm max-w-[85%]">
                            Explain superposition based on this PDF.
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="p-3 rounded-2xl rounded-tl-none bg-white/5 text-gray-200 text-sm max-w-[90%]">
                            Based on the document, <span className="text-blue-400 font-semibold">Superposition</span> is a fundamental principle where a quantum system can exist in multiple states at the same time until it is measured.
                            <br /><br />
                            The text uses Schrödinger's cat as an example (Page 4).
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-white/5 bg-white/5">
                    <div className="relative flex items-center gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 shrink-0">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex-1 bg-black/20 border border-white/10 rounded-xl h-10 flex items-center px-3">
                            <span className="text-sm text-gray-500">Ask about this document...</span>
                        </div>
                        <button className="p-2 bg-primary text-primary-foreground rounded-lg shrink-0">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
