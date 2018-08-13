import types from '../actions/types';

const initialState = {
  produtos: [],
  loading: false
};

const carrinhoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CARRINHO:
      return {
        ...state,
        loading: false,
        produtos: action.payload
      };
    case types.SET_CART_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default carrinhoReducer;
