const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
  nome: {
    type: String,
    required: true
  }
});

module.exports = Categoria = mongoose.model('categorias', CategoriaSchema);
