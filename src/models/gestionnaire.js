const mongoose = require('mongoose');

const { Schema } = mongoose;

const gestionnaireSchema = new Schema({
  fullname: String,
  numero: Schema.Types.Mixed,
});

module.exports = mongoose.model('Gestionnaire', gestionnaireSchema);
