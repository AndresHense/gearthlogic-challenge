const USER_INFO = 'userInfo';
const TOKEN = 'token';

const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO);
  return userInfo && JSON.parse(userInfo);
};

const setUserInfo = (user: any) => {
  localStorage.setItem(USER_INFO, JSON.stringify(user));
};

const deleteUserInfo = () => {
  localStorage.removeItem(USER_INFO);
};

const getToken = () => {
  const Token = localStorage.getItem(TOKEN);
  return Token && JSON.parse(Token);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN, JSON.stringify(token));
};

const deleteToken = () => {
  localStorage.removeItem(TOKEN);
};

export {
  getUserInfo,
  setUserInfo,
  deleteUserInfo,
  getToken,
  setToken,
  deleteToken,
};
