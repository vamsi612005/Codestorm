import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentLayout from "./layouts/StudentLayout";
import Dashboard from "./pages/student/Dashboard";
import MyCourses from "./pages/student/MyCourses";
import CourseDetail from "./pages/student/CourseDetail";
import QuizPage from "./pages/student/features/QuizPage";
import FlashCardsPage from "./pages/student/features/FlashCardsPage";
import ChatPage from "./pages/student/features/ChatPage";
import RagPage from "./pages/student/features/RagPage";
import { PaperGenPage } from "./pages/student/features/FeaturePages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Student Area */}
          <Route path="/student-app" element={<StudentLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="course/:id/quiz" element={<QuizPage />} />
            <Route path="course/:id/flashcards" element={<FlashCardsPage />} />
            <Route path="course/:id/chat" element={<ChatPage />} />
            <Route path="course/:id/rag" element={<RagPage />} />
            <Route path="course/:id/paper-gen" element={<PaperGenPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
