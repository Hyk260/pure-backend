import { UserCredentials } from '../types/index';
/**
 * 统一存储用户信息
 */
export declare function storeUsers(credentials: UserCredentials): Promise<void>;
/**
 * 统一查询用户信息
 */
export declare function getUserInfo(username: string): Promise<Record<string, string> | null>;
