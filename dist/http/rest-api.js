"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const utils_1 = require("../api/rest-api/utils");
// // https://cloud.tencent.com/document/product/269/1519
const defaultConfig = {
    baseURL: config_1.default.imServerBaseUrl,
    // 请求超时时间
    timeout: 10000,
};
class IMClientHttp {
    service;
    constructor() {
        this.service = axios_1.default.create({ ...defaultConfig });
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }
    /** 请求拦截 */
    httpInterceptorsRequest() {
        this.service.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            Promise.reject(error);
        });
    }
    /** 响应拦截 */
    httpInterceptorsResponse() {
        this.service.interceptors.response.use((response) => {
            console.log('data:=>', response.data);
            console.log('url:=>', defaultConfig.baseURL + response.config.url);
            const { data, status } = response;
            if (status === 200) {
                return data;
            }
            return Promise.reject(data); // 处理非200状态
        }, (error) => {
            Promise.reject(error);
        });
    }
    /** 通用请求工具函数 */
    request(config) {
        return this.service.request({
            ...config,
            url: (0, utils_1.buildURL)(config.url || ''),
        });
    }
}
exports.http = new IMClientHttp();
