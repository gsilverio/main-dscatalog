import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { myHistory } from './history';
import { getAuthData } from './storage';

//REACT_APP_ : variavel do netlify

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };
  //querry string passa um obj e gera uma querry string urlencoded
  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};
export const requestBackEnd = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : {};
  return axios({ ...config, baseURL: BASE_URL, headers });
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    console.log('INTERCEPTOR ANTES DA REQUISICAO');
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('ERRO NA REQUISICAO');
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log('INTERCEPTOR RESPOSTA COM SUCESSO');
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      myHistory.push('/admin/auth');
    }
    return Promise.reject(error);
  }
);
