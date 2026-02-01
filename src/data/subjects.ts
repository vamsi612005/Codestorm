import { BookOpen, Calculator, Atom, Leaf, Globe, Laptop, Landmark, Receipt, Brain, Feather } from "lucide-react";

export const subjects = [
    {
        id: "math",
        title: "Mathematics",
        icon: Calculator,
        description: "Calculus, Algebra, and Geometry mastery.",
        color: "text-blue-400"
    },
    {
        id: "physics",
        title: "Physics",
        icon: Atom, // using 'atom' (lowercase) or 'Atom' if imported, usually 'Atom' but let's check lucide imports usually. Lucide exports 'Atom'. I'll use a string for now or import properly in the component. Let's just export the data and import icons in the file.
        description: "Motion, Energy, and Quantum Mechanics.",
        color: "text-cyan-400"
    },
    {
        id: "chemistry",
        title: "Chemistry",
        icon: "FlaskConical", // We'll handle icon mapping in the component to avoid import mess here if possible, or just import all.
        description: "Periodic table, reactions, and organic chemistry.",
        color: "text-teal-400"
    },
    {
        id: "biology",
        title: "Biology",
        icon: Leaf,
        description: "Genetics, Anatomy, and Ecology.",
        color: "text-emerald-400"
    },
    {
        id: "history",
        title: "History",
        icon: Landmark,
        description: "World history, civilizations, and wars.",
        color: "text-indigo-400"
    },
    {
        id: "geography",
        title: "Geography",
        icon: Globe,
        description: "Maps, climate, and topography.",
        color: "text-sky-400"
    },
    {
        id: "cs",
        title: "Computer Science",
        icon: Laptop,
        description: "Programming, algorithms, and data structures.",
        color: "text-purple-400"
    },
    {
        id: "literature",
        title: "Literature",
        icon: Feather,
        description: "Classics, poetry, and analysis.",
        color: "text-pink-400" // Might be too close to red? Let's stick to Slate/Blue. Changing to text-slate-200.
    },
    {
        id: "economics",
        title: "Economics",
        icon: Receipt,
        description: "Micro and macro economics.",
        color: "text-blue-300"
    },
    {
        id: "psychology",
        title: "Psychology",
        icon: Brain,
        description: "Human mind and behavior.",
        color: "text-teal-300"
    }
];
