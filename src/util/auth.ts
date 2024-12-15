import { jwtDecode } from "jwt-decode";

interface TokenExpiry {
  exp: number;
}
import axiosClient from "./axios";
import { REFRESH_TOKEN_ROUTE } from "src/api/login/routes";
import { AxiosRequestConfig } from "axios";


export const setNewToken = (accessToken: string, refreshToken = '') => {
  const accessTokenInfo: TokenExpiry = jwtDecode(accessToken);
  const refreshTokenInfo: TokenExpiry = jwtDecode(refreshToken);
  localStorage.setItem('ACCESS_TOKEN', accessToken);
  localStorage.setItem('ACCESS_TOKEN_EXPIRY', `${accessTokenInfo.exp * 1000}`);
  localStorage.setItem('IS_REFRESH_TOKEN_LOADING', 'false');
  localStorage.setItem('REFRESH_TOKEN', refreshToken);
  localStorage.setItem('REFRESH_TOKEN_EXPIRY', `${refreshTokenInfo.exp * 1000}`);
}

export const isRefreshTokenExpired = () => { 
  const { refreshTokenExpiry } = getAuthInfo();
  const currentDate = Date.now();

  return refreshTokenExpiry && currentDate > refreshTokenExpiry;
}

const setIsRefreshTokenLoading = (isLoading: boolean) => {
  localStorage.setItem('IS_REFRESH_TOKEN_LOADING', JSON.stringify(isLoading));
};

export const refreshAccessToken = async (config?: AxiosRequestConfig) => {

  const { refreshToken, isRefreshTokenLoading } = getAuthInfo();

  const payload: CreateRefreshTokenPayload = {
    refreshToken: refreshToken ?? '',
  };

  if (isRefreshTokenLoading) {
    return;
  }
  setIsRefreshTokenLoading(true);

  try {
    const response = await axiosClient.post<CreateLoginResponse>(REFRESH_TOKEN_ROUTE, 
      payload, config);

    const token = response.data.accessToken;

    setNewToken(token);
    setIsRefreshTokenLoading(false);
    return response.data;

  } catch (error) {
    setIsRefreshTokenLoading(false);
    throw new Error('Refresh token failed: ' + error);
  }
}

export const setAuthInfo = (loggedState: CreateLoginResponse) => {
  setNewToken(loggedState.accessToken, 
    loggedState.refreshToken);
  localStorage.setItem('IS_LOGGED_IN', loggedState.LoggedInState.toString());
  localStorage.setItem('USER_INFO', JSON.stringify(loggedState.username));
}

export const getAuthInfo = () => {
  const userInfo = localStorage.getItem('USER_INFO');
  const isRefreshTokenLoading = localStorage.getItem('IS_REFRESH_TOKEN_LOADING');
  const accessTokenExpiry = localStorage.getItem('ACCESS_TOKEN_EXPIRY');
  const refreshTokenExpiry = localStorage.getItem('REFRESH_TOKEN_EXPIRY');

  return { 
    loggedState: localStorage.getItem('IS_LOGGED_IN'),
    username: localStorage.getItem('username'),
    accessToken: localStorage.getItem('ACCESS_TOKEN'),
    ...(accessTokenExpiry 
      ? { accessTokenExpiry: Number(accessTokenExpiry) }
      : {}),
    ...(refreshTokenExpiry
      ? { refreshTokenExpiry: Number(refreshTokenExpiry) }
      : {}),
      refreshToken: localStorage.getItem('REFRESH_TOKEN'),
      ...(isRefreshTokenLoading
        ? { isRefreshTokenLoading: JSON.parse(isRefreshTokenLoading) }
        : {}),
      ...(userInfo ? { userInfo: JSON.parse(userInfo) } : {}),
  }
} 

export const isUserLoggedIn = () => !!localStorage.getItem('ACCESS_TOKEN');
