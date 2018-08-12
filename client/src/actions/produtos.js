import axios from 'axios';
import types from './types';

export const getAllProdutos = () => async dispatch => {
  dispatch(setProdutoLoading());
  try {
    const produtos = await axios.get('/api/produtos/todos');
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

export const getOneProduto = produtoId => async dispatch => {
  dispatch(setProdutoLoading());
  try {
    const response = await axios.get(`/api/produtos/${produtoId}`);
    dispatch({
      type: types.GET_ONE_PRODUTO,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: types.GET_ONE_PRODUTO,
      payload: {}
    });
  }
};

export const getProdutosByCategoria = nome => async dispatch => {
  dispatch(setProdutoLoading());
  try {
    const produtos = await axios.get(`/api/produtos/todos/${nome}`);
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
