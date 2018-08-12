import types from '../actions/types';

const initialState = {
  produtos: [],
  produto: {},
  loading: false
};

const produtosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ONE_PRODUTO:
      return {
        ...state,
        produto: action.payload,
        loading: false,
        produtos: []
      };
    case types.GET_ALL_PRODUTOS:
      return {
        ...state,
        produtos: action.payload,
        loading: false
      };
    case types.SET_PRODUTOS_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default produtosReducer;
