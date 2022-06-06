import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants';
import {
  deleteToken,
  deleteUserInfo,
  setToken,
  setUserInfo,
} from '../localStorage/storage';

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const API_KEY = 'AIzaSyAGQtn7z7nfZVPKzx6Mf_Mkgyw2wo-Lhr8';
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        { email, password, returnSecureToken: true },
        config
      );

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      console.log(data);
      setUserInfo(data);
      setToken(data.idToken);
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  deleteUserInfo();
  deleteToken();
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};
