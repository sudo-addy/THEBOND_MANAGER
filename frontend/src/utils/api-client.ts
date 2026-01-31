import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * API Client with interceptors for authentication and error handling
 */
class ApiClient {
    private client: AxiosInstance;
    private isRefreshing = false;
    private failedQueue: Array<{
        resolve: (value?: unknown) => void;
        reject: (reason?: any) => void;
    }> = [];

    constructor() {
        this.client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3210/api/v1',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    /**
     * Setup request and response interceptors
     */
    private setupInterceptors() {
        // Request interceptor - Add auth token
        this.client.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Log requests in development
                if (process.env.NODE_ENV === 'development') {
                    console.log(`🔵 ${config.method?.toUpperCase()} ${config.url}`);
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - Handle errors and token refresh
        this.client.interceptors.response.use(
            (response) => {
                // Log successful responses in development
                if (process.env.NODE_ENV === 'development') {
                    console.log(`🟢 ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
                }
                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // Log errors in development
                if (process.env.NODE_ENV === 'development') {
                    console.error(`🔴 ${originalRequest.method?.toUpperCase()} ${originalRequest.url}`, error.response?.status);
                }

                // Handle 401 Unauthorized - Token expired
                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Queue the request if token refresh is in progress
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({ resolve, reject });
                        })
                            .then(() => this.client(originalRequest))
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const newToken = await this.refreshToken();
                        this.setToken(newToken);
                        this.processQueue(null);
                        return this.client(originalRequest);
                    } catch (refreshError) {
                        this.processQueue(refreshError);
                        this.clearToken();

                        // Redirect to login
                        if (typeof window !== 'undefined') {
                            window.location.href = '/login';
                        }

                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                // Handle specific error codes
                if (error.response?.status === 403) {
                    console.error('Access forbidden - insufficient permissions');
                }

                if (error.response?.status === 429) {
                    console.error('Rate limit exceeded - please try again later');
                }

                return Promise.reject(error);
            }
        );
    }

    /**
     * Process queued requests after token refresh
     */
    private processQueue(error: any) {
        this.failedQueue.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve();
            }
        });
        this.failedQueue = [];
    }

    /**
     * Get stored auth token
     */
    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token');
    }

    /**
     * Set auth token
     */
    private setToken(token: string) {
        if (typeof window === 'undefined') return;
        localStorage.setItem('auth_token', token);

        // Also set in cookie for middleware
        document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
    }

    /**
     * Clear auth token
     */
    private clearToken() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('auth_token');
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    /**
     * Refresh authentication token
     */
    private async refreshToken(): Promise<string> {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3210/api/v1'}/auth/refresh`,
            { refreshToken }
        );

        return response.data.token;
    }

    // HTTP Methods
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.patch<T>(url, data, config);
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
