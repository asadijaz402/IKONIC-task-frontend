import { GET_ERRORS, SET_USER } from './types';
import { SC } from '../../components/helper/ServerCall';
import jwt_decode from 'jwt-decode';

export const registerUser = (data, navigate) => (dispatch) => {
  SC.registrationPostCall({ url: '/auth/register', data })
    .then((res) => {
      if (res?.data?.success) {
        navigate('/login');
      } else {
        dispatch({ type: GET_ERRORS, payload: res?.response?.data });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err?.response?.data });
    });
};

export const loginUser = (data) => (dispatch) => {
  SC.postCall({ url: '/auth/login', data })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);

      localStorage.setItem('data', res.data.user);
      const decode = jwt_decode(token);
      dispatch(setUser(decode));
      dispatch({ type: GET_ERRORS, payload: {} });
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(setUser({}));
  navigate('/login');
};

export const setUser = (data) => {
  return { type: SET_USER, payload: data };
};
