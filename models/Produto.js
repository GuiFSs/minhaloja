const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  descricao: {
    type: Object,
    required: true
  },
  tamanho: {
    type: Object
  },
  marca: {
    type: String
  },
  peso: {
    type: Number
  },
  quantidadeEstoque: {
    type: Number,
    required: true
  },
  imagens: {
    type: Array
  },
  categoria: {
    type: Schema.Types.ObjectId,
    required: true
  },
  avaliacao: {
    type: Object
  }
});

module.exports = Produto = mongoose.model('produtos', ProdutoSchema);
