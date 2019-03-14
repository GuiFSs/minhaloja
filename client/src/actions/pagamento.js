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

export const getFrete = cep => async dispatch => {
  dispatch(setFreteLoading(true));
  try {
    const res = await axios.get(`/api/pagamento/frete/${cep}`);
    dispatch({
      type: types.GET_FRETE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.GET_FRETE,
      payload: err.response.data
    });
  }
  dispatch(setFreteLoading(false));
};

export const setPagamentoLoading = bool => {
  return {
    type: types.SET_PAGAMENTO_LOADING,
    payload: bool
  };
};

export const setFreteLoading = bool => {
  return {
    type: types.SET_FRETE_LOADING,
    payload: bool
  };
};
