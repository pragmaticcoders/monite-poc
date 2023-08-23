import { API_URL } from 'utils/constants';
import { api } from 'utils/http';
import { appStore } from 'store/app.store';

export const getAuthenticatedUser = async (): Promise<any> => {
  const cachedCredentials = appStore.getCachedCredentials();

  if (!cachedCredentials) {
    return Promise.reject();
  }

  return api(`${API_URL}/auth/token`, {
    method: 'POST',
    body: {
      name: cachedCredentials.login,
      password: cachedCredentials.password,
    },
  });
};

export const authorizeUser = async (login: string, password: string): Promise<any> =>
  api(`${API_URL}/auth/token`, {
    method: 'POST',
    body: {
      name: login,
      password,
    },
  });