import { DEFAULT_API_TIMEOUT } from '../constants';
import { Api } from '../artifacts';

export const publicApi = new Api({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: DEFAULT_API_TIMEOUT,
});

export const api = new Api({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: DEFAULT_API_TIMEOUT,
});
