const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const PedidoSchema = new Schema({
  produto: {
    type: Schema.Types.ObjectId,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    required: true
  },
  data: {
    type: String,
    default: Date.now
  },
  endereco: {
    type: Object,
    required: true
  },
  formaPagamento: {
    type: Object,
    required: true
  }
});

module.exports = Pedido = mongoose.model('pedidos', PedidoSchema);
