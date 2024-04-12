import { FetchDataParams, FetchReturnData, FetchOptions, QueryParts } from '../../../types/types';

class FetchService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  makeUrl(endpoint?: string, queryParts?: QueryParts): string {
    let url: string = this.baseUrl;

    if (endpoint) url += `${endpoint}`;

    if (queryParts) {
      url += `?${Object.entries(queryParts)
        .map(([key, value]: [string, string | number]) => `${key}=${value}`)
        .join('&')}`;
    }

    return url;
  }

  async fetchData<T>(props: FetchDataParams): Promise<FetchReturnData<T>> {
    const { method, endpoint, queryParts, payload, returnData } = props;
    const url: string = this.makeUrl(endpoint, queryParts);

    const options: FetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (payload) {
      options.body = JSON.stringify(payload);
    }

    const loadedData: FetchReturnData<T> = {
      response: undefined,
      data: undefined,
    };

    try {
      loadedData.response = await fetch(url, options);

      if (returnData && loadedData.response.ok) {
        loadedData.data = await loadedData.response.json();
      }
    } catch (e) {
      console.error(e);
    }

    return loadedData;
  }
}

export const fetchService = new FetchService('http://127.0.0.1:3000');
