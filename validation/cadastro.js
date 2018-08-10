const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validarCadastroInput(data) {
  let errors = {};

  data.nome = !isEmpty(data.nome) ? data.nome : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.senha = !isEmpty(data.senha) ? data.senha : '';
  data.senha2 = !isEmpty(data.senha2) ? data.senha2 : '';

  if (!Validator.isLength(data.nome, { min: 2, max: 30 })) {
    errors.nome = 'Name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.nome)) {
    errors.nome = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!Validator.isLength(data.senha, { min: 6, max: 30 })) {
    errors.senha = 'Password mus be at least 6 characters';
  }
  if (Validator.isEmpty(data.senha)) {
    errors.senha = 'Password field is required';
  }

  if (Validator.isEmpty(data.senha2)) {
    errors.senha2 = 'Confirm Password field is required';
  }
  if (!Validator.equals(data.senha, data.senha2)) {
    errors.senha2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
