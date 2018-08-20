const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  axios = require('axios');

const Produto = require('../../models/Produto');

router.post(
  '/',
  // passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { produtos } = req.body.carrinho;
    const pagamento = {
      produtos: [],
      valorTotal: 0
    };
    const produtosIds = produtos.map(produto => produto._id);
    try {
      const response = await Produto.find({
        _id: { $in: produtosIds }
      });
      pagamento.produtos = [...response];
      pagamento.produtos.map(produto => {
        pagamento.valorTotal += produto.preco;
      });
      res.status(200).json(pagamento);
    } catch (err) {
      res.status(400).json({ err });
    }
  }
);

module.exports = router;
