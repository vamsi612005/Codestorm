
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Send, Bot, User, RefreshCw, Paperclip, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

const ChatPage = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: `Hello! I'm your AI tutor for specific course content. How can I help you study today?`,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponses = [
                "That's an interesting question about this topic. Let's break it down...",
                "Based on the course material, the answer typically involves...",
                "Could you clarify which specific chapter you're referring to?",
                "Great observation! In this context, it means..."
            ];
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: randomResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-black/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
            {/* Chat Header */}
            <header className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar className="w-10 h-10 border border-primary/50">
                            <AvatarFallback className="bg-primary/20 text-primary"><Bot className="w-6 h-6" /></AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">AI Tutor</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setMessages([])} title="Clear Chat">
                        <RefreshCw className="w-5 h-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5 text-muted-foreground" />
                    </Button>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <Avatar className="w-8 h-8 mt-1">
                            {msg.sender === 'ai' ? (
                                <AvatarFallback className="bg-primary/20 text-primary"><Bot className="w-5 h-5" /></AvatarFallback>
                            ) : (
                                <AvatarFallback className="bg-secondary text-white"><User className="w-5 h-5" /></AvatarFallback>
                            )}
                        </Avatar>

                        <div className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                        : 'bg-white/10 text-white rounded-tl-sm'
                                    }`}
                            >
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1 px-1">{formatTime(msg.timestamp)}</span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-4">
                        <Avatar className="w-8 h-8 mt-1">
                            <AvatarFallback className="bg-primary/20 text-primary"><Bot className="w-5 h-5" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-white/10 p-4 rounded-2xl rounded-tl-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="flex items-center gap-3 bg-black/20 border border-white/10 rounded-full px-4 py-2 focus-within:border-primary/50 transition-colors">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full h-8 w-8">
                        <Paperclip className="w-4 h-4" />
                    </Button>

                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask anything about the course..."
                        className="bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-muted-foreground"
                    />

                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        size="icon"
                        className="bg-primary hover:bg-primary/90 text-black rounded-full h-9 w-9"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
