import { useState, useEffect, useMemo } from 'react';
import { initializeHttpClientService } from './index';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export function useHttpClientService(axiosConfig: AxiosRequestConfig): AxiosInstance | null {
  const [httpInstance, setHttpInstance] = useState<AxiosInstance | null>(null);

  const memoizedConfig = useMemo(() => axiosConfig, [JSON.stringify(axiosConfig)]);

  useEffect(() => {
    let isMounted = true;

    initializeHttpClientService()
      .then((service) => {
        if (isMounted) {
          const instance = service.createHttpInstance(memoizedConfig);
          console.log('Axios instance created in hook:', instance);
          setHttpInstance(instance);
        }
      })
      .catch((error) => {
        console.error('Error initializing HttpClientService:', error);
      });

    return () => {
      isMounted = false;
    };
  }, [memoizedConfig]);

  return httpInstance;
}