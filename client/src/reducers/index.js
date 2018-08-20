import { combineReducers } from 'redux';
import produtosReducer from './produtos';
import autenticacaoReducer from './autenticacao';
import errorsReducer from './errors';
import carrinhoReducer from './carrinho';
import categoriasReducer from './categorias';
import pagamentoReducer from './pagamento';

export default combineReducers({
  produtos: produtosReducer,
  autenticacao: autenticacaoReducer,
  errors: errorsReducer,
  categorias: categoriasReducer,
  carrinho: carrinhoReducer,
  pagamento: pagamentoReducer
});
