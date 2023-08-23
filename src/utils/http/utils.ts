export const getAuthorizationTokens = (): string | void => {
  if (window.sessionStorage) {
    const accessToken = window.sessionStorage.getItem('accessToken');
    // const refreshToken = window.sessionStorage.getItem('refreshToken');

    if (accessToken) {
      return `Bearer ${accessToken}`;
    }
  }
};

export const getAccessToken = (): string | void => {
  if (window.sessionStorage) {
    const accessToken = window.sessionStorage.getItem('access_token');

    if (accessToken) {
      return accessToken;
    }
  }
}

export const checkAuthorizationTokens = (response: Response): void => {
  if (response.headers.has('X-Access-Token')) {
    window.sessionStorage.setItem('accessToken', response.headers.get('X-Access-Token'));
  }

  if (response.headers.has('X-Refresh-Token')) {
    window.sessionStorage.setItem('refreshToken', response.headers.get('X-Refresh-Token'));
  }
};
