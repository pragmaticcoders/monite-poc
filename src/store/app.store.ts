import { action, makeObservable, observable } from 'mobx';
import { MoniteSDK } from "@team-monite/sdk-api";
import { getAuthenticatedUser } from "service/auth.service";

interface CachedCredentials {
  login: string;
  password: string;
}

class AppStore {
  @observable isAppInitialized: boolean = false;
  @observable isAppLoading: boolean = false;
  @observable isAuthorizationPending: boolean = false;
  @observable authenticatedUser: any = null;
  @observable cachedCredentials: CachedCredentials | null = null;
  @observable moniteClient: MoniteSDK | null = null;
  @observable entityId: string = '';
  @observable entityUserId: string = '';

  constructor() {
    makeObservable(this);
  }

  @action
  setIsAppInitialized(isAppInitialized: boolean) {
    this.isAppInitialized = isAppInitialized;
  }

  @action
  setAuthenticatedUser(authenticatedUser: any) {
    this.authenticatedUser = authenticatedUser;
  }

  @action
  setIsAuthorizationPending(isAuthorizationPending: boolean) {
    this.isAuthorizationPending = isAuthorizationPending;
  }

  @action
  setIsAppLoading(isAppLoading: boolean) {
    this.isAppLoading = isAppLoading;
  }

  @action
  setCachedCredentials(cachedCredentials: CachedCredentials) {
    window.sessionStorage.setItem('cachedCredentials', JSON.stringify(cachedCredentials));
  }

  @action
  createMoniteClient(entityId: string, entityUserId: string) {
    this.entityId = entityId;
    this.entityUserId = entityUserId;

    const monite = new MoniteSDK({
      apiUrl: 'https://api.sandbox.monite.com/v1',
      entityId,
      fetchToken: getAuthenticatedUser,
    });

    this.moniteClient = monite;
  }


  getCachedCredentials(): CachedCredentials | null {
    const cachedCredentials = window.sessionStorage.getItem('cachedCredentials');

    if (cachedCredentials) {
      return JSON.parse(cachedCredentials);
    }

    return null;
  }

  @action
  reset() {
    this.isAppInitialized = false;
    this.isAppLoading = false;
    this.isAuthorizationPending = false;
    this.authenticatedUser = null;
    this.cachedCredentials = null;
    this.moniteClient = null;
    this.entityId = '';
    this.entityUserId = '';
  }
}

export const appStore = new AppStore();
