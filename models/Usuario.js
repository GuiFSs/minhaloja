const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  endereco: {
    type: Object
  },
  carrinho: {
    type: Object,
    default: {
      produtos: []
    }
  },
  meusPedidos: {
    type: Array,
    default: []
  },
  telefone: {
    type: String
  }
});

module.exports = Usuario = mongoose.model('usuarios', UsuarioSchema);
