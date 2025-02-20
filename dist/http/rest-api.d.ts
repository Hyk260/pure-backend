import { AxiosInstance, AxiosRequestConfig } from 'axios';
declare class IMClientHttp {
    service: AxiosInstance;
    constructor();
    /** 请求拦截 */
    httpInterceptorsRequest(): void;
    /** 响应拦截 */
    httpInterceptorsResponse(): void;
    /** 通用请求工具函数 */
    request(config: AxiosRequestConfig<any>): Promise<any>;
}
export declare const http: IMClientHttp;
export {};
