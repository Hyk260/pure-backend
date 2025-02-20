import { Request, Response } from 'express';
interface Result {
    ActionStatus: string;
    ErrorCode: number;
    ErrorInfo: string;
    ResultItem: any[];
}
interface CheckItem {
    UserID: string;
}
interface AccountImportParams {
    UserID: string;
    Nick?: string;
    FaceUrl?: string;
}
export declare const accountCheck: (params: CheckItem[]) => Promise<boolean>;
export declare const accountImport: (params: AccountImportParams) => Promise<boolean>;
export declare const restSendMsg: (params: any) => Promise<Result>;
export declare const addGroupMember: (params: any) => Promise<Result>;
export declare const restApi: (req: Request, res: Response) => Promise<void>;
export {};
