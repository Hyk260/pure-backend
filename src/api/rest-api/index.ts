import { Request, Response } from 'express';
import { http } from "../../http/rest-api";
import { generateRandomInt32 } from "./utils";

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

// 用于查询自有账号是否已导入即时通信 IM，支持批量查询。
// https://cloud.tencent.com/document/product/269/38417
export const accountCheck = async (params: CheckItem[]): Promise<boolean> => {
  try {
    const result: Result = await http.request({
      url: "v4/im_open_login_svc/account_check",
      method: "post",
      data: { CheckItem: params },
    });
    return result.ResultItem?.[0]?.AccountStatus === "Imported";
  } catch (error) {
    console.error('Account check failed:', error);
    return false;
  }
};

// 导入单个账号
export const accountImport = async (params: AccountImportParams): Promise<boolean> => {
  try {
    const result: Result = await http.request({
      url: "v4/im_open_login_svc/account_import",
      method: "post",
      data: { ...params },
    });
    return result.ErrorCode === 0;
  } catch (error) {
    console.error('Account import failed:', error);
    return false;
  }
};
// 单发单聊消息
// https://cloud.tencent.com/document/product/269/2282
export const restSendMsg = async (params: any) => {
  const { From_Account, To_Account, Text } = params;
  const result: Result = await http.request({
    url: "v4/openim/sendmsg",
    method: "post",
    data: {
      SyncOtherMachine: 1, // 消息同步1 不同步 2
      From_Account,
      To_Account,
      // MsgSeq: "",
      MsgRandom: generateRandomInt32(),
      ForbidCallbackControl: [
        "ForbidBeforeSendMsgCallback",
        "ForbidAfterSendMsgCallback",
      ], // 禁止回调控制选项
      MsgBody: [
        {
          MsgType: "TIMTextElem",
          MsgContent: {
            Text,
          },
        },
      ],
    },
  });
  return result;
};
// 拉人入群
export const addGroupMember = async (params: any) => {
  const { groupId, member } = params;
  const result: Result = await http.request({
    url: "v4/group_open_http_svc/add_group_member",
    method: "post",
    data: {
      GroupId: groupId,
      MemberList: [{ Member_Account: member }],
    },
  });
  return result;
};

// API路由处理
const API_METHODS = {
  accountCheck,
  accountImport,
  restSendMsg,
  addGroupMember
} as const;

export const restApi = async (req: Request, res: Response): Promise<void> => {
  const { params = {}, funName } = req.body;

  if (!funName || !(funName in API_METHODS)) {
    res.status(404).json({ msg: "Invalid function name" });
  }

  try {
    const result = await API_METHODS[funName as keyof typeof API_METHODS](params);
    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.error(`API Error [${funName}]:`, error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
