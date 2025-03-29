import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from '../config/api';
import { toast } from 'sonner';

export interface LoginResponse {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  token: string;
  expireAt: string;
}

interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

class HttpClient {
  private instance: AxiosInstance;
  private retryCount: number = 0;

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const user = localStorage.getItem('user');
        if (user) {
          const { user_json } = JSON.parse(user);
          if (user_json.token) {
            config.headers.Authorization = `Bearer ${user_json.token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      <T>(response: AxiosResponse<ApiResponse<T>>) => {
        const { data } = response;
        const errorHandlers = new Map([
          [20007, { redirect: '/auth?mode=login', defaultMsg: '用户已存在，请登录' }],
          [20008, { redirect: '/auth?mode=register', defaultMsg: '用户不存在，请注册' }]
        ]);

        const handler = errorHandlers.get(data.code);
        if (handler) {
          if (window.confirm(data.msg || handler.defaultMsg)) {
            window.location.href = handler.redirect;
          }
          throw new Error(data.msg || handler.defaultMsg);
        } else if (data.code !== 0) {
          throw new Error(data.msg || '请求失败');
        }
        return data.data;
      },
      async <T>(error: AxiosError<ApiResponse<T>>) => {
        if (error.response?.status === 401) {
          // Token 过期处理
          localStorage.removeItem('user');
          window.location.href = '/auth';
          return Promise.reject(new Error('登录已过期，请重新登录'));
        }

        if (this.retryCount < MAX_RETRIES && this.shouldRetry(error)) {
          this.retryCount++;
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return this.instance(error.config!);
        }

        this.retryCount = 0;
        const errorMessage = error.response?.data?.msg || error.message || '请求失败';
        toast.error(errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    return (
      error.code === 'ECONNABORTED' ||
      error.code === 'ETIMEDOUT' ||
      !error.response ||
      error.response.status >= 500
    );
  }

  public async get<T>(url: string, params?: object): Promise<T> {
    return this.instance.get<ApiResponse<T>, T>(url, { params });
  }

  public async post<T>(url: string, data?: object): Promise<T> {
    return this.instance.post<ApiResponse<T>, T>(url, data);
  }

  public async put<T>(url: string, data?: object): Promise<T> {
    return this.instance.put<ApiResponse<T>, T>(url, data);
  }

  public async delete<T>(url: string): Promise<T> {
    return this.instance.delete<ApiResponse<T>, T>(url);
  }
}

export const httpClient = new HttpClient();

export async function interpretResponse<T = unknown>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const jsonData: ApiResponse<T> = await response.json();
  
  if (jsonData.code !== 0) {
    throw new Error(jsonData.msg || '请求失败');
  }
  
  return jsonData.data;
}