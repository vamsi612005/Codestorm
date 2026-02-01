
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    level: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String },
    bg: { type: String },
    description: { type: String },
    progress: { type: Number, default: 0 }
});

export default mongoose.model('Course', CourseSchema);
