
import { useParams } from "react-router-dom";
import RagChatDemo from "@/components/demo/RagChatDemo";
import FlashCardDemo from "@/components/demo/FlashCardDemo";
import QuestionGenDemo from "@/components/demo/QuestionGenDemo";
import LiveAssistantDemo from "@/components/demo/LiveAssistantDemo";

export const RagPage = () => {
    const { id } = useParams();
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">RAG Chatbot: {id}</h2>
            <div className="h-[600px] w-full"><RagChatDemo /></div>
        </div>
    );
};

export const FlashCardsPage = () => {
    const { id } = useParams();
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Flash Cards: {id}</h2>
            <div className="h-[600px] w-full"><FlashCardDemo /></div>
        </div>
    );
};

export const PaperGenPage = () => {
    const { id } = useParams();
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Paper Generator: {id}</h2>
            <div className="h-[600px] w-full"><QuestionGenDemo /></div>
        </div>
    );
};

export const ChatPage = () => {
    const { id } = useParams();
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">AI Chat: {id}</h2>
            <div className="h-[600px] w-full"><LiveAssistantDemo /></div>
        </div>
    );
};
