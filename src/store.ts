import { configureStore } from '@reduxjs/toolkit';
import { getUserInfo, getToken } from './localStorage/storage';
import {
  ProductCreateReducer,
  ProductDeleteReducer,
  ProductDetailsReducer,
  ProductListReducer,
  ProductUpdateReducer,
} from './reducers/productReducers';

import {
  userDetailsReducer,
  userLoginReducer,
  userLogoutReducer,
} from './reducers/userReducers';

const userIdFromStorage = getUserInfo();
const tokenFromStorage = getToken();

export const store = configureStore({
  reducer: {
    productList: ProductListReducer,
    productUpdate: ProductUpdateReducer,
    productDetails: ProductDetailsReducer,
    productCreate: ProductCreateReducer,
    productDelete: ProductDeleteReducer,
    userLogin: userLoginReducer,
    userLogout: userLogoutReducer,
    userDetails: userDetailsReducer,
  },
  preloadedState: {
    userLogin: {
      userId: userIdFromStorage,
      token: tokenFromStorage,
    },
    userDetails: {
      user: {},
      loading: true,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
