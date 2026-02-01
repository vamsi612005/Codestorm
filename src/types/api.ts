export interface Course {
    _id: string;
    title: string;
    level: string;
    icon: string;
    color: string;
    bg: string;
    description: string;
    progress: number;
}

export interface Question {
    text: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

export interface Quiz {
    _id: string;
    courseId: string;
    title: string;
    questions: Question[];
}

export interface Flashcard {
    _id: string;
    courseId: string;
    front: string;
    back: string;
    hint?: string;
}
