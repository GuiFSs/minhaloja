import types from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const cadastrarUsuario = (user, history) => async dispatch => {
  dispatch(setUsuarioLoading(true));
  try {
    await axios.post('/api/usuarios/cadastro', user);
    loginUsuario(user, history);
  } catch (err) {
    dispatch(setUsuarioLoading(false));
    dispatch({
      type: types.SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUsuario = (user, history) => async dispatch => {
  dispatch(setUsuarioLoading(true));
  try {
    const response = await axios.post('/api/usuarios/login', user);
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setUsuarioAtual(decoded));
    history.goBack();
  } catch (err) {
    dispatch(setUsuarioLoading(false));
    dispatch({
      type: types.SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const setUsuarioAtual = user => {
  return {
    type: types.SET_USUARIO_ATUAL,
    payload: user
  };
};

export const logoutUsuario = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setUsuarioAtual({}));
};

export const setUsuarioLoading = loading => {
  return {
    type: types.SET_USUARIO_LOADING,
    payload: loading
  };
};
