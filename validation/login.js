const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validarLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.senha = !isEmpty(data.senha) ? data.senha : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email invalido';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email é obrigatório';
  }

  if (Validator.isEmpty(data.senha)) {
    errors.senha = 'Senha é obrigatório';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
