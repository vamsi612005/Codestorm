
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Quiz from './models/Quiz.js';
import Flashcard from './models/Flashcard.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin@cluster0.fmc67ef.mongodb.net/neev_ai?retryWrites=true&w=majority";

// Updated Colors: STRICTLY Primary (Teal) or Secondary (Coral/Orange-Red) or White/Neutrals.
const coursesData = [
    { title: "Mathematics", level: "Advanced", icon: "Calculator", color: "text-primary", bg: "bg-primary/10", description: "Master calculus, algebra, and geometry with AI.", progress: 75 },
    { title: "Physics", level: "Intermediate", icon: "Activity", color: "text-secondary", bg: "bg-secondary/10", description: "Understand the laws of the universe.", progress: 45 },
    { title: "Chemistry", level: "Beginner", icon: "FlaskConical", color: "text-primary", bg: "bg-primary/10", description: "Explore molecular structures and reactions.", progress: 30 },
    { title: "Biology", level: "Advanced", icon: "FlaskConical", color: "text-secondary", bg: "bg-secondary/10", description: "Dive into the complexity of life.", progress: 60 },
    { title: "History", level: "Intermediate", icon: "Globe", color: "text-primary", bg: "bg-primary/10", description: "Learn from the past to shape the future.", progress: 85 },
    { title: "Computer Science", level: "Advanced", icon: "Code", color: "text-secondary", bg: "bg-secondary/10", description: "Algorithms, data structures, and AI.", progress: 92 },
    { title: "Literature", level: "Beginner", icon: "Book", color: "text-primary", bg: "bg-primary/10", description: "Analyze classic and modern texts.", progress: 20 },
    { title: "Music Theory", level: "Beginner", icon: "Music", color: "text-secondary", bg: "bg-secondary/10", description: "Understand the language of music.", progress: 10 },
    { title: "Art History", level: "Intermediate", icon: "Palette", color: "text-primary", bg: "bg-primary/10", description: "Visual arts through the ages.", progress: 50 },
    { title: "Economics", level: "Advanced", icon: "Bitcoin", color: "text-secondary", bg: "bg-secondary/10", description: "Micro and macro economic principles.", progress: 40 },
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to DB');

        // Clear existing data
        await Course.deleteMany({});
        await Quiz.deleteMany({});
        await Flashcard.deleteMany({});
        console.log('🗑️ Cleared existing data');

        // Insert Courses
        const createdCourses = await Course.insertMany(coursesData);
        console.log(`📚 Inserted ${createdCourses.length} courses`);

        // Helper to find course by title
        const findCourse = (title) => createdCourses.find(c => c.title === title);

        // 1. Mathematics
        const math = findCourse("Mathematics");
        if (math) {
            await Quiz.create({
                courseId: math._id,
                title: "Calculus Basics",
                questions: [
                    { text: "What is the derivative of x^2?", options: ["x", "2x", "x^2", "2"], correctAnswer: 1, explanation: "Power rule: 2x." },
                    { text: "Integral of 1/x?", options: ["ln|x|", "e^x", "x^2", "1/x"], correctAnswer: 0, explanation: "Integral is ln|x|." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: math._id, front: "Derivative of sin(x)", back: "cos(x)", hint: "Trig function" },
                { courseId: math._id, front: "Integral of e^x", back: "e^x", hint: "It's itself" }
            ]);
        }

        // 2. Physics
        const physics = findCourse("Physics");
        if (physics) {
            await Quiz.create({
                courseId: physics._id,
                title: "Newtonian Mechanics",
                questions: [
                    { text: "F = ?", options: ["ma", "mc^2", "mv", "mgh"], correctAnswer: 0, explanation: "Newton's Second Law." },
                    { text: "Unit of Force?", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: 2, explanation: "Named after Isaac Newton." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: physics._id, front: "Speed of Light (c)", back: "3 x 10^8 m/s", hint: "Fastest speed" },
                { courseId: physics._id, front: "Gravity on Earth (g)", back: "9.8 m/s^2", hint: "Acceleration" }
            ]);
        }

        // 3. Chemistry
        const chem = findCourse("Chemistry");
        if (chem) {
            await Quiz.create({
                courseId: chem._id,
                title: "Atomic Structure",
                questions: [
                    { text: "Symbol for Gold?", options: ["Ag", "Au", "Fe", "Cu"], correctAnswer: 1, explanation: "Aurum in Latin." },
                    { text: "PH of water?", options: ["0", "7", "14", "10"], correctAnswer: 1, explanation: "Neutral PH is 7." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: chem._id, front: "H2O", back: "Water", hint: "Universal solvent" },
                { courseId: chem._id, front: "NaCl", back: "Table Salt", hint: "Sodium Chloride" }
            ]);
        }

        // 4. Biology
        const bio = findCourse("Biology");
        if (bio) {
            await Quiz.create({
                courseId: bio._id,
                title: "Cell Biology",
                questions: [
                    { text: "Powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"], correctAnswer: 2, explanation: "Generates ATP." },
                    { text: "DNA stands for?", options: ["Deoxyribonucleic Acid", "Ribonucleic Acid", "Amino Acid", "Protein"], correctAnswer: 0, explanation: "Genetic blueprint." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: bio._id, front: "Mitosis", back: "Cell Division", hint: "Makes 2 identical cells" },
                { courseId: bio._id, front: "Photosynthesis", back: "Plants make food", hint: "Needs sunlight" }
            ]);
        }

        // 5. History
        const history = findCourse("History");
        if (history) {
            await Quiz.create({
                courseId: history._id,
                title: "World War II",
                questions: [
                    { text: "Year WWII ended?", options: ["1940", "1945", "1950", "1939"], correctAnswer: 1, explanation: "Ended in 1945." },
                    { text: "First US President?", options: ["Lincoln", "Washington", "Adams", "Jefferson"], correctAnswer: 1, explanation: "George Washington." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: history._id, front: "1492", back: "Columbus sailed the ocean blue", hint: "Discovery of Americas" },
                { courseId: history._id, front: "Magna Carta", back: "1215", hint: "Rights of Kings" }
            ]);
        }

        // 6. Computer Science
        const cs = findCourse("Computer Science");
        if (cs) {
            await Quiz.create({
                courseId: cs._id,
                title: "Algorithms",
                questions: [
                    { text: "Time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correctAnswer: 1, explanation: "Splits in half each time." },
                    { text: "FIFO structure?", options: ["Stack", "Queue", "Tree", "Graph"], correctAnswer: 1, explanation: "First In, First Out." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: cs._id, front: "HTML", back: "HyperText Markup Language", hint: "Web structure" },
                { courseId: cs._id, front: "API", back: "Application Programming Interface", hint: "Connects software" }
            ]);
        }

        // 7. Literature
        const lit = findCourse("Literature");
        if (lit) {
            await Quiz.create({
                courseId: lit._id,
                title: "Shakespeare",
                questions: [
                    { text: "Hamlet's country?", options: ["England", "Denmark", "Scotland", "France"], correctAnswer: 1, explanation: "Prince of Denmark." },
                    { text: "Who wrote 1984?", options: ["Orwell", "Huxley", "Bradbury", "Steinbeck"], correctAnswer: 0, explanation: "George Orwell." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: lit._id, front: "To be or not to be", back: "Hamlet", hint: "Soliloquy" },
                { courseId: lit._id, front: "Moby Dick", back: "Herman Melville", hint: "White Whale" }
            ]);
        }

        // 8. Music Theory
        const music = findCourse("Music Theory");
        if (music) {
            await Quiz.create({
                courseId: music._id,
                title: "Basic Notation",
                questions: [
                    { text: "How many lines in a staff?", options: ["4", "5", "6", "3"], correctAnswer: 1, explanation: "Standard staff has 5 lines." },
                    { text: "Symbol for silence?", options: ["Note", "Rest", "Clef", "Bar"], correctAnswer: 1, explanation: "A rest indicates silence." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: music._id, front: "Treble Clef", back: "G Clef", hint: "Higher notes" },
                { courseId: music._id, front: "Bass Clef", back: "F Clef", hint: "Lower notes" }
            ]);
        }

        // 9. Art History
        const art = findCourse("Art History");
        if (art) {
            await Quiz.create({
                courseId: art._id,
                title: "Renaissance",
                questions: [
                    { text: "Who painted the Mona Lisa?", options: ["Michelangelo", "Raphael", "Da Vinci", "Donatello"], correctAnswer: 2, explanation: "Leonardo da Vinci." },
                    { text: "Style of Starry Night?", options: ["Realism", "Impressionism", "Post-Impressionism", "Cubism"], correctAnswer: 2, explanation: "Van Gogh." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: art._id, front: "Impressionism", back: "Light and color focus", hint: "Monet" },
                { courseId: art._id, front: "Surrealism", back: "Dream-like imagery", hint: "Dali" }
            ]);
        }

        // 10. Economics
        const econ = findCourse("Economics");
        if (econ) {
            await Quiz.create({
                courseId: econ._id,
                title: "Microeconomics",
                questions: [
                    { text: "Law of Demand?", options: ["Price up, Qty down", "Price up, Qty up", "No change", "Random"], correctAnswer: 0, explanation: "Inverse relationship." },
                    { text: "GDP stands for?", options: ["Gross Domestic Product", "General Domestic Price", "Grand Domestic Plan", "Global Daily Production"], correctAnswer: 0, explanation: "Measure of economic output." }
                ]
            });
            await Flashcard.insertMany([
                { courseId: econ._id, front: "Supply Curve", back: "Upward sloping", hint: "Sellers want high prices" },
                { courseId: econ._id, front: "Inflation", back: "Rising prices", hint: "Money worth less" }
            ]);
        }

        console.log('✅ Database Seeded Successfully');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
