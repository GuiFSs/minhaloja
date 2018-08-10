const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.nome = !isEmpty(data.nome) ? data.nome : '';
  data.preco = !isEmpty(data.preco) ? data.preco : 0;
  data.descricao = !isEmpty(data.descricao) ? data.descricao : '';
  data.quantidadeEstoque = !isEmpty(data.quantidadeEstoque)
    ? data.quantidadeEstoque
    : 0;

  if (Validator.isEmpty(data.nome)) {
    errors.nome = 'Nome é obrigatório';
  }

  if (!Validator.isFloat(data.preco)) {
    errors.preco = 'Preco deve ser um float';
  }

  if (Validator.isEmpty(data.descricao)) {
    errors.descricao = 'Descricão é obrigatório';
  }
  if (!Validator.isNumeric(data.quantidadeEstoque)) {
    errors.quantidadeEstoque = 'Quantidade no estoque é inválido';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
