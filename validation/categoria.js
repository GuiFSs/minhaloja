const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validarCategoriaInput(nome) {
  let errors = {};

  nome = !isEmpty(nome) ? nome : '';

  if (!Validator.isLength(nome, { min: 2, max: 30 })) {
    errors.nome = 'Nome da categoria deve ter entre 2 e 30 caracteres';
  }
  if (Validator.isEmpty(nome)) {
    errors.nome = 'Nome da categoria é obrigatório';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
