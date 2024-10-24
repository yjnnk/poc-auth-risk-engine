// interceptor-library/index.js

import axios from 'axios';

let method1Callback: any;

export function setMethod1Callback(callback: any) {
  method1Callback = callback;
  return method1Callback
}

export const https = axios.create()

https.interceptors.response.use(
    response => response,
    error => {
        
        if (error.response && error.response.status === 417) {
            if (method1Callback) {
                method1Callback(error.response.data);
            }
        }
        return Promise.reject(error);
    }
);