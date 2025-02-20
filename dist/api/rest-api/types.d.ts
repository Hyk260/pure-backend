export type ApiResponse<T = unknown> = {
    ErrorCode: number;
    ErrorInfo: string;
    Result?: T;
};
export type AccountCheckResult = {
    AccountStatus: 'Imported' | 'NotImported';
};
export type MessageSendResult = {
    MsgTime: number;
    MsgKey: string;
};
export type GroupOperationResult = {
    MemberList: Array<{
        Member_Account: string;
        Result: number;
    }>;
};
