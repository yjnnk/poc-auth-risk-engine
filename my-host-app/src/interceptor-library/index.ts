// interceptor-library/index.js

import  { AxiosStatic, CreateAxiosDefaults } from 'axios';

interface IHttpClientService {
    axios: AxiosStatic
    challengeCodeFromRiskEngine: () => any
}

export class HttpClientService {
    axios: AxiosStatic
    challengeCodeFromRiskEngine!: any
    constructor({axios, challengeCodeFromRiskEngine}: IHttpClientService) {
        this.axios = axios
        this.challengeCodeFromRiskEngine = challengeCodeFromRiskEngine
    }

    async mountInterceptors (error: any = {}) {
       
        if (error.response && error.response.status === 417) {
            if (this.challengeCodeFromRiskEngine) {
                this.challengeCodeFromRiskEngine(error.response.data);
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