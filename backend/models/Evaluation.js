const mongoose = require('mongoose');

// Examen o Evaluación específica creada por un profesor
const evaluationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Resultados del examen para cada estudiante
    results: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        score: { type: Number, required: true, min: 0, max: 100 },
        feedback: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
