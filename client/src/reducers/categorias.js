import types from '../actions/types';

const initialState = {
  categorias: [],
  categoria: {}
};

const categoriasReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CATEGORIAS:
      return {
        ...state,
        categorias: action.payload
      };
    case types.GET_ONE_CATEGORIA:
      return {
        ...state,
        categorias: action.payload
      };
    default:
      return state;
  }
};

export default categoriasReducer;
