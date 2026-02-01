
import mongoose from 'mongoose';

const FlashcardSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    front: { type: String, required: true },
    back: { type: String, required: true },
    hint: { type: String }
});

export default mongoose.model('Flashcard', FlashcardSchema);
