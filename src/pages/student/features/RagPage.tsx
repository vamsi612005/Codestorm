
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Send, Bot, User, RefreshCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/lib/api";

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

const RagPage = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: `Hello! Please select a knowledge base (Collection) from the dropdown above to start chatting about your documents.`,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [collections, setCollections] = useState<string[]>([]);
    const [selectedCollection, setSelectedCollection] = useState<string>("");

    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch Collections on Mount
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch(`${API_URL}/ai/collections`, {
                    headers: { "ngrok-skip-browser-warning": "true" }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.collections) {
                        setCollections(data.collections);
                    }
                }
            } catch (error) {
                console.error("Failed to load collections", error);
                toast({
                    title: "Connection Error",
                    description: "Could not load knowledge bases. Ensure AI Service is running.",
                    variant: "destructive"
                });
            }
        };
        fetchCollections();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        if (!selectedCollection) {
            toast({
                title: "Select a Collection",
                description: "Please choose a document collection from the dropdown first.",
                variant: "destructive"
            });
            return;
        }

        const userText = inputValue;
        setInputValue(""); // Clear input immediately

        const newUserMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: userText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setIsTyping(true);

        try {
            const res = await fetch(`${API_URL}/ai/rag`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({
                    message: userText,
                    collection: selectedCollection,
                    history: [] // Can handle chat history state later if needed
                })
            });

            if (!res.ok) throw new Error("Failed to fetch response");

            const data = await res.json();

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: data.answer || "I'm sorry, I couldn't find an answer to that.",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newAiMsg]);

        } catch (error) {
            console.error("RAG Error:", error);
            toast({
                title: "Error",
                description: "Could not connect to the AI Tutor. Is the backend running?",
                variant: "destructive"
            });
        } finally {
            setIsTyping(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-black/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
            {/* Chat Header */}
            <header className="p-4 border-b border-white/10 bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar className="w-10 h-10 border border-primary/50">
                            <AvatarFallback className="bg-primary/20 text-primary"><Bot className="w-6 h-6" /></AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-black rounded-full ${selectedCollection ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">AI Tutor</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {selectedCollection ? (
                                <><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Connected: {selectedCollection}</>
                            ) : (
                                <><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Select a collection below</>
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="w-full sm:w-[200px]">
                        <Select onValueChange={setSelectedCollection} value={selectedCollection}>
                            <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                <SelectValue placeholder="Select Collection" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/10 text-white backdrop-blur-xl">
                                {collections.length === 0 ? (
                                    <SelectItem value="none" disabled>No collections found</SelectItem>
                                ) : (
                                    collections.map(col => (
                                        <SelectItem key={col} value={col}>{col}</SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => setMessages([])} title="Clear Chat">
                        <RefreshCw className="w-5 h-5 text-muted-foreground" />
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
                        <FileText className="w-4 h-4" />
                    </Button>

                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={selectedCollection ? `Asking ${selectedCollection}...` : "Select a collection first..."}
                        className="bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-muted-foreground"
                    />

                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping || !selectedCollection}
                        size="icon"
                        className="bg-primary hover:bg-primary/90 text-black rounded-full h-9 w-9 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RagPage;
