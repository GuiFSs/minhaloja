import axios from 'axios';
import types from './types';

export const getAllCategorias = () => async dispatch => {
  try {
    const response = await axios.get('/api/categorias/todas');
    dispatch({
      type: types.GET_ALL_CATEGORIAS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: types.GET_ALL_CATEGORIAS,
      // payload: err.response.data
      payload: []
    });
  }
};
