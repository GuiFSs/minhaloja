import { combineReducers } from 'redux';
import produtosReducer from './produtos';

export default combineReducers({
  produtos: produtosReducer
});
