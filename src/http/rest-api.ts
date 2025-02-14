import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from "../config";
import { buildURL } from "../api/rest-api/utils";

// // https://cloud.tencent.com/document/product/269/1519
const defaultConfig = {
  baseURL: config.imServerBaseUrl,
  // 请求超时时间
  timeout: 10000,
};

class IMClientHttp {
  service: AxiosInstance;
  constructor() {
    this.service = axios.create({ ...defaultConfig });
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  /** 请求拦截 */
  httpInterceptorsRequest() {
    this.service.interceptors.request.use((config) => {
      return config;
    }, (error) => {
      Promise.reject(error)
    }
    );
  }
  /** 响应拦截 */
  httpInterceptorsResponse() {
    this.service.interceptors.response.use((response) => {
      console.log('data:=>', response.data)
      console.log('url:=>', defaultConfig.baseURL + response.config.url)
      const { data, status } = response;
      if (status === 200) {
        return data;
      }
      return Promise.reject(data); // 处理非200状态
    }, (error) => {
      Promise.reject(error)
    });
  }
  /** 通用请求工具函数 */
  request(config: AxiosRequestConfig<any>): Promise<any> {
    return this.service.request({
      ...config,
      url: buildURL(config.url || ''),
    });
  }
}

export const http = new IMClientHttp();