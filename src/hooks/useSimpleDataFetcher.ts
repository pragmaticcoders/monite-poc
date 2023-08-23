import { useEffect } from 'react';
import { dataStore } from 'store/data.store';
import get from 'lodash/get';
import { toJS } from 'mobx';
import { isEmpty } from 'lodash';

// simple data fetcher for POC purposes

interface SimpleDataFetcherAPI {
  isLoading: boolean;
  data: any;
  refetch?: () => void;
}

export const useSimpleDataFetcher = (dataName: string, fetchFn: any): SimpleDataFetcherAPI => {
  const data = toJS(dataStore.data[dataName]);

  const fetchData = async () => {
    if (isEmpty(data)) {
      dataStore.setLoader(dataName, true);
    }

    try {
      const response = await fetchFn();

      dataStore.setData(dataName, response);
    } catch (error) {
      console.error(error);
    } finally {
      dataStore.setLoader(dataName, false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading: get(dataStore, ['loaders', dataName], false),
    data,
    refetch: fetchData,
  };
};
