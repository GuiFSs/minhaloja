import types from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const cadastrarUsuario = (user, history) => async dispatch => {
  dispatch(setUsuarioLoading(true));
  try {
    const response = await axios.post('/api/usuarios/cadastro', user);
    console.log(
      'action autenticacao - response.data de cadastro',
      response.data
    );
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

export const updateUsuario = data => async dispatch => {
  dispatch(setUsuarioLoading(true));
  try {
    const response = await axios.put('/api/usuarios/update', data);
    dispatch(setUsuarioAtual(response.data.user));
  } catch (err) {
    dispatch(setUsuarioAtual({}));
  }
  dispatch(setUsuarioLoading(false));
};

export const getUsuarioAtualInfo = () => async dispatch => {
  try {
    // TODO: fix this
    const response = await axios.get('/api/usuarios/atual');
    dispatch(setUsuarioAtual(response.data));
  } catch (err) {
    dispatch(setUsuarioAtual({}));
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
