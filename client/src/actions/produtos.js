import axios from 'axios';
import types from './types';

export const getAllProdutos = () => async dispatch => {
  dispatch(setProdutoLoading());
  try {
    const produtos = await axios.get('api/produtos/todos');
    dispatch({
      type: types.GET_ALL_PRODUTOS,
      payload: produtos.data
    });
  } catch (err) {
    dispatch({
      type: types.GET_ALL_PRODUTOS,
      payload: []
    });
  }
};

export const setProdutoLoading = () => {
  return {
    type: types.SET_PRODUTOS_LOADING
  };
};
