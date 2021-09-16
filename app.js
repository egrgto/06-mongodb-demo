const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo')
.then(()=> console.log('Conectado a MongoDB...'))
.catch(err => console.log('No se pudo conectar con MongoDB..',err));