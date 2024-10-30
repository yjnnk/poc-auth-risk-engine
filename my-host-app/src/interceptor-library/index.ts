// interceptor-library/index.js

import  { AxiosStatic, CreateAxiosDefaults } from 'axios';

interface IHttpClientService {
    axios: AxiosStatic
    methodCallback: () => any
}

export class HttpClientService {
    axios: AxiosStatic
    methodCallback!: any
    constructor({axios, methodCallback}: IHttpClientService) {
        this.axios = axios
        this.methodCallback = methodCallback
    }

    async mountInterceptors (error: any = {}) {
       
        if (error.response && error.response.status === 417) {
            if (this.methodCallback) {
                this.methodCallback(error.response.data);
            }
        }

    } 

    createHttpInstance = (axiosConfig: CreateAxiosDefaults) => {
        const https = this.axios.create(axiosConfig)

        https.interceptors.request.use((config) => {
            return config
        })

        https.interceptors.response.use(
            (response) => response,
            async (error) => this.mountInterceptors(error)
        )

        return https
    }
}