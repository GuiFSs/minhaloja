import { combineReducers } from 'redux';
import produtosReducer from './produtos';
import autenticacaoReducer from './autenticacao';
import errorsReducer from './errors';
import categoriasReducer from './categorias';

export default combineReducers({
  produtos: produtosReducer,
  autenticacao: autenticacaoReducer,
  errors: errorsReducer,
  categorias: categoriasReducer
});
