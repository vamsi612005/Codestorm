const API_URL = "/api";

export const api = {
    async getCourses() {
        const res = await fetch(`${API_URL}/courses`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
    },

    async getCourse(id: string) {
        const res = await fetch(`${API_URL}/courses/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        return res.json();
    },

    async getQuiz(courseId: string) {
        const res = await fetch(`${API_URL}/courses/${courseId}/quiz`);
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error("Failed to fetch quiz");
        }
        return res.json();
    },

    async getFlashcards(courseId: string) {
        const res = await fetch(`${API_URL}/courses/${courseId}/flashcards`);
        if (!res.ok) throw new Error("Failed to fetch flashcards");
        return res.json();
    }
};
