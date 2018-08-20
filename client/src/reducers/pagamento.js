import types from '../actions/types';
const initialState = {
  produtos: [],
  valorTotal: 0
};

const pagamentoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PAGAMENTO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default pagamentoReducer;
