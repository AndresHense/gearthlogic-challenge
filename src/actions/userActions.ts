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

export const getUserDetails =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const {
        userLogin: { token },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:8080/user/${id}`,
        config
      );

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
