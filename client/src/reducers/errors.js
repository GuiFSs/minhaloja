import types from '../actions/types';

const initialState = {
  errors: {}
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default errorsReducer;
