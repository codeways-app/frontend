import { API_BASE_URL, DEFAULT_API_TIMEOUT } from '../constants';
import { Api } from '../artifacts';

export const publicApi = new Api({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: DEFAULT_API_TIMEOUT,
});

export const api = new Api({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: DEFAULT_API_TIMEOUT,
});
