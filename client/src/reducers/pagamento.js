import types from '../actions/types';
const initialState = {
  produtos: [],
  valorTotal: 0,
  loading: false
};

const pagamentoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PAGAMENTO:
      return {
        ...state,
        ...action.payload
      };
    case types.SET_PAGAMENTO_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default pagamentoReducer;
