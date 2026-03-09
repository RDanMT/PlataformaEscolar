const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// @route   POST api/students
// @desc    Crear un nuevo alumno
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name, lastName, enrollmentId, group, gradeLevel } = req.body;
    try {
        let student = await Student.findOne({ enrollmentId });
        if (student) return res.status(400).json({ msg: 'La matrícula ya existe' });

        student = new Student({ name, lastName, enrollmentId, group, gradeLevel });
        await student.save();
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET api/students
// @desc    Obtener todos los alumnos
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const students = await Student.find().sort({ lastName: 1 });
        res.json(students);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// @route   POST api/students/:id/grades
// @desc    Añadir calificación general a un alumno
// @access  Private
router.post('/:id/grades', auth, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ msg: 'Alumno no encontrado' });

        const { subject, score, period } = req.body;
        student.generalGrades.push({ subject, score, period });

        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
