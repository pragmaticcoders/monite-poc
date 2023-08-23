import { appStore } from 'store/app.store';
import * as authService from 'service/auth.service';
import { history } from 'utils/history.util';

export const authenticateUser = async () => {
  appStore.setIsAppLoading(true);

  try {
    const token = await authService.getAuthenticatedUser();

    if (token) {
      window.sessionStorage.setItem('access_token', token.access_token);
      appStore.createMoniteClient(token.entity_id, token.entity_user_id);
    }

    appStore.setAuthenticatedUser(token);
    appStore.setIsAppInitialized(true);
  } catch (e) {
    history.push('/login');
  } finally {
    appStore.setIsAppLoading(false);
  }
};

export const logOutUser = async (): Promise<void> => {
  window.sessionStorage.clear();

  history.push('/login');
};

export const logIn = async (login: string, password: string, onError: any) => {
  appStore.setIsAuthorizationPending(true);

  try {
    const token = await authService.authorizeUser(login, password);

    if (token) {
      if (token?.message) {
        onError('Invalid credentials');
        return;
      }

      appStore.setCachedCredentials({ login, password });
      window.sessionStorage.setItem('access_token', token.access_token);
      appStore.createMoniteClient(token.entity_id, token.entity_user_id);

      history.push('/app');
    }

    onError();
  } catch (e) {
    console.error(e);

    onError();
  } finally {
    appStore.setIsAuthorizationPending(false);
  }
};
