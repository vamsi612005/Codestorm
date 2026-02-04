
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Quiz from './models/Quiz.js';
import Flashcard from './models/Flashcard.js';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin@cluster0.fmc67ef.mongodb.net/neev_ai?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Neev.AI API is running');
});

// Get all courses
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get course by ID
app.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Proxy to AI Service - RAG Query
app.post('/api/ai/rag', async (req, res) => {
    try {
        const { message, collection, history } = req.body;

        console.log("➡️ RAG Query:", { message, collection });

        // Call the external Python AI Service
        const response = await fetch('http://10.12.11.60:7575/invoke', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task: "query",
                payload: {
                    question: message,
                    collection_name: collection,
                    chat_history: history || []
                }
            })
        });

        if (!response.ok) {
            throw new Error(`AI Service Error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.error("AI Proxy Error:", err);
        res.status(500).json({ error: "Failed to communicate with AI Tutor." });
    }
});

// Proxy to Get Collections
app.get('/api/ai/collections', async (req, res) => {
    try {
        console.log("Fetching collections...");
        const response = await fetch('http://10.12.11.60:7575/collections');
        if (!response.ok) throw new Error("Failed to fetch collections");
        const data = await response.json();
        console.log("Collections:", data);
        res.json(data);
    } catch (err) {
        console.error("Collections Proxy Error:", err);
        res.status(500).json({ error: "Failed to fetch collections" });
    }
});

// Get quiz for a course
app.get('/api/courses/:id/quiz', async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ courseId: req.params.id });
        if (!quiz) return res.status(404).json({ message: 'No quiz found for this course' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get flashcards for a course
app.get('/api/courses/:id/flashcards', async (req, res) => {
    try {
        const cards = await Flashcard.find({ courseId: req.params.id });
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Configure Multer for RAM storage (files won't be saved to disk locally, just forwarded)
const upload = multer({ storage: multer.memoryStorage() });

// File Upload Proxy
app.post('/api/upload', upload.array('files'), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded." });
        }

        console.log(`📤 Uploading ${req.files.length} files to AI Service...`);

        // Prepare FormData for the external service
        const formData = new FormData();
        req.files.forEach((file) => {
            const blob = new Blob([file.buffer], { type: file.mimetype });
            formData.append('files', blob, file.originalname);
        });

        // Call External AI Service
        const response = await fetch('http://10.12.11.60:7575/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`AI Service Upload Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Upload Success:", data);
        res.json(data);

    } catch (err) {
        console.error("❌ Upload Proxy Error:", err);
        res.status(500).json({ error: "Failed to upload files to AI Service." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
