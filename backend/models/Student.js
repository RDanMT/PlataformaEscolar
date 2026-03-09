const mongoose = require('mongoose');

// Representa a un alumno en general y puede guardar sus calificaciones por materia o periodo
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    enrollmentId: { type: String, required: true, unique: true }, // Matricula
    group: { type: String, required: true }, // Ej. 'A', 'B'
    gradeLevel: { type: Number, required: true }, // Año o Grado (1, 2, 3...)

    // Registro general de calificaciones
    generalGrades: [{
        subject: { type: String, required: true },
        score: { type: Number, required: true, min: 0, max: 100 },
        period: { type: String, required: true } // Ej. "Q1", "Semestre 1"
    }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
