import { Send, Bot, User } from "lucide-react";
import { useState } from "react";

const LiveAssistantDemo = () => {
    const [messages] = useState([
        { id: 1, role: "agent", text: "Hello! working on calculus today?" },
        { id: 2, role: "user", text: "Yes, struggling with derivatives." },
        { id: 3, role: "agent", text: "No problem. Let's start with the power rule. visualize x²..." }
    ]);

    return (
        <div className="h-full w-full flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[500px]">
                {/* Header */}
                <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white text-sm">Neev Assistant</h3>
                        <p className="text-xs text-muted-foreground">Online • Replies instantly</p>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'agent' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                                }`}>
                                {msg.role === 'agent' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>
                            <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'agent'
                                    ? 'bg-white/5 text-gray-200 rounded-tl-none'
                                    : 'bg-primary text-primary-foreground rounded-tr-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-8 w-16">
                            <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-white/5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask anything..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-gray-500"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveAssistantDemo;
