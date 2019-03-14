import axios from 'axios';
import types from './types';

export const addProdutoToCart = produtoId => async dispatch => {
  dispatch(setCartLoading(true));
  try {
    const res = await axios.get(`/api/produtos/${produtoId}`);
    let produtosCarrinho = [];
    if (!localStorage.getItem('carrinho')) {
      produtosCarrinho.push(res.data);
      localStorage.setItem('carrinho', JSON.stringify(produtosCarrinho));
      dispatch(setCartLoading(false));
      return;
    }
    produtosCarrinho = [...JSON.parse(localStorage.getItem('carrinho'))];
    // verify if the fetched produto is already in the cart
    let alreadyHave = false;
    for (let produto of produtosCarrinho) {
      if (produto._id === res.data._id) {
        alreadyHave = true;
        break;
      }
    }
    if (!alreadyHave) {
      produtosCarrinho.push(res.data);
    }
    localStorage.setItem('carrinho', JSON.stringify(produtosCarrinho));
    dispatch(setCartLoading(false));
  } catch (err) {
    dispatch({
      type: types.SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getCarrinho = () => dispatch => {
  dispatch(setCartLoading(true));
  const carrinho = localStorage.getItem('carrinho');
  if (carrinho) {
    dispatch({
      type: types.GET_CARRINHO,
      payload: JSON.parse(carrinho)
    });
  } else {
    dispatch({
      type: types.GET_CARRINHO,
      payload: []
    });
  }
  dispatch(setCartLoading(false));
};

export const removeProdutoFromCart = produtoId => async dispatch => {
  dispatch(setCartLoading(true));
  try {
    const res = await axios.get(`/api/produtos/${produtoId}`);
    if (localStorage.getItem('carrinho')) {
      let produtosCarrinho = [...JSON.parse(localStorage.getItem('carrinho'))];
      produtosCarrinho = produtosCarrinho.filter(
        produto => produto._id !== res.data._id
      );
      localStorage.setItem('carrinho', JSON.stringify(produtosCarrinho));
      dispatch(setCartLoading(false));
    } else {
      dispatch({
        type: types.SET_ERRORS,
        payload: { produto: 'Não existe esse produto to carrinho' }
      });
    }
  } catch (err) {
    dispatch({
      type: types.SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const setCartLoading = loading => {
  return {
    type: types.SET_CART_LOADING,
    payload: loading
  };
};
