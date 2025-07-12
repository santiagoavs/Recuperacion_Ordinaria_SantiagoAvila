const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  carnet: String,
  nombre: String,
  apellido: String,
  grado: String,
  estado: String
}, { collection: 'estudiantes' }); 

module.exports = mongoose.model('Estudiante', estudianteSchema);
