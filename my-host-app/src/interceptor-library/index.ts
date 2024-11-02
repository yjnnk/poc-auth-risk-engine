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
    
        // Handle only 417 errors and avoid multiple retries for the same request
        if (error.response && error.response.status === 417 && !config._retry) {
            config._retry = true;
    
            // Trigger Risk Engine challenge if available
            if (this.challengeCodeFromRiskEngine) {
                this.challengeCodeFromRiskEngine(error.response.data);
            }
    
            // Check if already authenticated; if so, retry immediately
            if (this.isAuthenticated) {
                config.headers = {
                    ...config.headers,
                    'x-custom-header': 'false',
                };
                return this.axios.request(config);
            }
    
            // Set up a new authPromise if it's null (first-time or after reset)
            if (!this.authPromise) {
                this.authPromise = new Promise<void>((resolve) => {
                    this.authResolve = resolve;
                });
            }
    
            // Wait for authentication to complete
            await this.authPromise;
    
            // Reset authPromise and authResolve for future retries
            this.authPromise = null;
            this.authResolve = null;
    
            // Update headers for the retry and send the request again
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