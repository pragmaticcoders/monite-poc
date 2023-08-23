import get from 'lodash/get';
import { checkAuthorizationTokens, getAccessToken } from 'utils/http/utils';
import * as authController from 'controller/auth.controller';
import { toast } from 'react-toastify';

interface APIOptions<T extends object> {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
  body?: T;
  getFullResponse?: boolean;
  showErrorDialog?: boolean;
  fetchOptions?: RequestInit;
  entityId?: string;
}

export const api = async <Body extends object>(
  url: string,
  options: APIOptions<Body> = {}
): Promise<any> => {
  const method = get(options, 'method', 'GET');

  const getFullResponse = get(options, 'getFullResponse', false);

  const headers: HeadersInit = {
    'Content-Type': 'Application/json',
    ...get(options, 'fetchOptions.headers', {}),
  };

  if (options.entityId) {
    headers['x-monite-entity-id'] = options.entityId;
    headers['x-monite-version'] = '2023-04-12';
  }

  const body = get(options, 'body');

  if (getAccessToken()) {
    headers['Authorization'] = `Bearer ${getAccessToken()}`;
    // body['bearer_token'] = getAccessToken();
  }

  const response: Response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    // credentials: withCredentials ? 'include' : undefined,
  });

  checkAuthorizationTokens(response);

  if (getFullResponse) {
    return response;
  }

  const responseContentType = getResponseContentType(response);

  if (response.status === 401) {
    authController.logOutUser();

    await handleErrorResponse(response, options, responseContentType);

    return;
  }

  if (response.status >= 400) {
    await handleErrorResponse(response, options, responseContentType);
  }

  if (response.status === 204) {
    return response;
  }

  if (response.status !== 201 && responseContentType === 'json') {
    const responseJSON = await response.json();

    return responseJSON;
  }

  if (response.status !== 201) {
    try {
      const responseBody = await response.body;

      return responseBody;
    } catch {
      return response;
    }
  }

  return response;
};

const handleErrorResponse = async (
  response: Response,
  options: APIOptions<any>,
  responseContentType: string
) => {
  const responseStatusCode = response.status;
  const showErrorDialog = get(options, 'showErrorDialog', true) && responseStatusCode !== 401;

  if (response.status >= 500) {
    showErrorDialog && toast.error('Server error');
    throw new Error((response as Response & { message?: string }).message);
  }

  if (responseContentType === 'json') {
    const jsonResponse = await response.json();

    const errorMessage = get(jsonResponse, 'error.message');
    showErrorDialog && toast.error(errorMessage);

    throw new Error(errorMessage);
  }

  if (responseContentType === 'text') {
    const textResponse = await response.text();
    showErrorDialog && toast.error(textResponse);

    throw new Error(textResponse);
  }

  showErrorDialog && toast.error('Something went wrong...');

  throw new Error('unknown error');
};

const getResponseContentType = (response: Response): string => {
  const contentType = response.headers.get('content-type');

  if (!contentType) {
    return null;
  }

  if (contentType.includes('application/json')) return 'json';
  if (contentType.includes('application/xml')) return 'xml';
  if (contentType.includes('text/html')) return 'text';

  return null;
};
