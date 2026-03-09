const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// @route   POST api/evaluations
// @desc    Crear examen
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, description } = req.body;
    try {
        const newEval = new Evaluation({
            title,
            description,
            teacher: req.user.id
        });
        const evaluation = await newEval.save();
        res.json(evaluation);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET api/evaluations
// @desc    Obtener todas las evaluaciones (opcionalmente filtradas por profesor si es necesario)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const evals = await Evaluation.find().populate('teacher', ['name']).sort({ date: -1 });
        res.json(evals);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// @route   POST api/evaluations/:id/results
// @desc    Añadir un resultado de alumno a un examen
// @access  Private
router.post('/:id/results', auth, async (req, res) => {
    const { studentId, score, feedback } = req.body;
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (!evaluation) return res.status(404).json({ msg: 'Evaluación no encontrada' });

        // Validar que no haya ya una nota para este estudiante en este examen
        const existingResult = evaluation.results.find(r => r.student.toString() === studentId);
        if (existingResult) {
            existingResult.score = score;
            existingResult.feedback = feedback;
        } else {
            evaluation.results.push({ student: studentId, score, feedback });
        }

        await evaluation.save();
        res.json(evaluation);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET api/evaluations/:id
// @desc    Obtener un examen específico con sus resultados
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id)
            .populate('teacher', ['name'])
            .populate('results.student', ['name', 'lastName', 'enrollmentId']);
        if (!evaluation) return res.status(404).json({ msg: 'Evaluación no encontrada' });

        res.json(evaluation);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
