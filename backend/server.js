const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const estudiantesRoutes = require('./src/routes/estudiantes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/estudiantes', estudiantesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'));
  })
  .catch(err => console.error(err));

  mongoose.connection.on('connected', () => {
  console.log('Base de datos conectada a:', mongoose.connection.name);
});

