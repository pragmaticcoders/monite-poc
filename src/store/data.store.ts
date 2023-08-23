import { action, makeObservable, observable } from "mobx";

class DataStore {
  @observable data: Record<string, any> = {};
  @observable loaders: Record<string, boolean> = {};

  constructor() {
    makeObservable(this)
  }

  @action
  setData(dataName: string, data: any) {
    this.data[dataName] = data;
  }

  @action
  setLoader(loaderName: string, isLoading: boolean) {
    this.loaders[loaderName] = isLoading;
  }
}

export const dataStore = new DataStore()