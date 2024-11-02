import { AxiosStatic, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

interface IHttpClientService {
    axios: AxiosStatic;
}

export class HttpClientService {
    axios: AxiosStatic;
    private isAuthenticated: boolean = false;
    private authPromise: Promise<void> | null = null;
    private authResolve: (() => void) | null = null;

    constructor({ axios }: IHttpClientService) {
        this.axios = axios;
        this.initialize();
    }

    private async mountInterceptors(error: any = {}) {
        const config = error.config as AxiosRequestConfig & { _retry?: boolean };
        if (error.response && error.response.status === 417 && !config._retry) {
            config._retry = true;

            if (this.challengeCodeFromRiskEngine) {
                this.challengeCodeFromRiskEngine(error.response.data);
            }

            if (!this.authPromise) {
                this.authPromise = new Promise<void>((resolve) => {
                    this.authResolve = resolve;
                });
            }

            await this.authPromise;

            config.headers = {
                ...config.headers,
                'x-custom-header': 'false',
            };

            return this.axios.request(config);
        }

        return Promise.reject(error);
    }

    createHttpInstance = (axiosConfig: CreateAxiosDefaults) => {
        const https = this.axios.create(axiosConfig);

        https.interceptors.request.use(
            (config) => config,
            (error) => Promise.reject(error)
        );

        https.interceptors.response.use(
            (response) => response,
            (error) => this.mountInterceptors(error)
        );

        return https;
    };

    private initialize() {
        window.addEventListener('user-authenticated', this.handleUserAuthenticated as EventListener);
    }

    private handleUserAuthenticated = (event: CustomEvent) => {
        console.log('HttpClientService received user-authenticated event:', event.detail);

        this.isAuthenticated = true;

        if (this.authResolve) {
            this.authResolve();
            this.authResolve = null;
            this.authPromise = null;
        }
    };

    get challengeCodeFromRiskEngine() {
        return (window as any).setChallegeOnRiskMFE;
    }
}