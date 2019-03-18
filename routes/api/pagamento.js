const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  axios = require('axios');

const Produto = require('../../models/Produto');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { produtos } = req.body.carrinho;

    const pagamento = {
      produtos: [],
      valorTotal: 0
    };
    try {
      const produtosIds = produtos.map(produto => produto._id);
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

router.get('/frete/:cep', async (req, res) => {
  const { cep } = req.params;

  try {
    const response = await axios.get(
      `http://apps.widenet.com.br/busca-cep/api/cep/${cep}.json`
    );
    const resData = await response.data;
    const endereco = {};
    if (resData.status === 1) {
      const { address, city, code, district, state } = resData;

      endereco['rua'] = address;
      endereco['cidade'] = city;
      endereco['cep'] = code;
      endereco['bairro'] = district;
      endereco['estado'] = state;

      const freteOptions = {
        opt1: 7.99,
        opt2: 54.99,
        opt3: 1.99
      };

      return res.status(200).json({ endereco, freteOptions });
    }
  } catch (err) {
    return res.status(400).json({
      err,
      message:
        'Ops, ocorreu um erro inesperado. Tente novamente ou calcule o frete na próxima etapa'
    });
  }
});

module.exports = router;
