import types from './types';

export const setErrors = errors => {
  return {
    type: types.SET_ERRORS,
    payload: errors
  };
};
