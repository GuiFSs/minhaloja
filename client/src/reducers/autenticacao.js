import types from '../actions/types';
import isEmpty from '../utils/is-empty';

const initialState = {
  loading: false,
  isAutenticado: false,
  usuario: {}
};

const autenticacaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USUARIO_ATUAL:
      return {
        ...state,
        loading: false,
        usuario: {
          ...state.usuario,
          ...action.payload
        },
        isAutenticado: !isEmpty(action.payload)
      };

    case types.SET_USUARIO_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default autenticacaoReducer;
