import types from './types';
import axios from 'axios';

export const setPagamento = () => async dispatch => {
  dispatch(setPagamentoLoading(true));
  try {
    // when format the carrinho object, change this
    const data = {
      carrinho: {
        produtos: [...JSON.parse(localStorage.getItem('carrinho'))]
      }
    };
    const response = await axios.post('/api/pagamento', data);
    dispatch({
      type: types.SET_PAGAMENTO,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: types.SET_PAGAMENTO,
      payload: {}
    });
  }
  dispatch(setPagamentoLoading(false));
};

export const setPagamentoLoading = bool => {
  return {
    type: types.SET_PAGAMENTO_LOADING,
    payload: bool
  };
};
