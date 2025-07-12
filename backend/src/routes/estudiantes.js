const express = require('express');
const router = express.Router();
const Estudiante = require('../models/Estudiante');

// Obtener todos
router.get('/', async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.json(estudiantes);
});

// Crear
router.post('/', async (req, res) => {
  const nuevo = new Estudiante(req.body);
  const guardado = await nuevo.save();
  res.json(guardado);
});

// Editar
router.put('/:id', async (req, res) => {
  const actualizado = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// Eliminar
router.delete('/:id', async (req, res) => {
  await Estudiante.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Eliminado' });
});

module.exports = router;
