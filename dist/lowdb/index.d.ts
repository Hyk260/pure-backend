import { UserCredentials } from '../types/index';
export declare function storeLowdbUsers({ username, password }: UserCredentials): Promise<"已注册" | "注册成功">;
export declare function getLowdbUserInfo(username: string): Promise<any>;
