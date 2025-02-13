import { Request, Response } from 'express';
import service from "../../http/rest-api";
import { generateRandomInt32, buildURL } from "./utils";

interface Result {
  ErrorCode: number;
  ErrorInfo: string;
  ResultItem: any[];
}

export const accountCheck = async (params: any) => {
  try {
    const result: Result = await service({
      url: buildURL("v4/im_open_login_svc/account_check"),
      method: "post",
      data: {
        CheckItem: params,
      },
    });
    const { ErrorCode, ErrorInfo, ResultItem } = result;
    if (ErrorCode !== 0) return ErrorInfo;
    const flag = ResultItem[0].AccountStatus == "Imported";
    return flag;
  } catch (error) {
    return false;
  }
};
// 导入单个账号
export const accountImport = async (params: any) => {
  try {
    const result: Result = await service({
      url: buildURL("v4/im_open_login_svc/account_import"),
      method: "post",
      data: {
        ...params,
        // UserID,
        // Nick,
        // FaceUrl,
      },
    });
    const { ErrorCode, ErrorInfo } = result;
    if (ErrorCode !== 0) return ErrorInfo;
    return result;
  } catch (error) {
    console.log(error);
  }
};
// 单发单聊消息
export const restSendMsg = async (params: any) => {
  const { From_Account, To_Account, Text } = params;
  const result = await service({
    url: buildURL("v4/openim/sendmsg"),
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
  console.log(result, "restSendMsg");
  return result;
};
// 拉人入群
export const addGroupMember = async (params: any) => {
  const { groupId, member } = params;
  const result = await service({
    url: buildURL("v4/group_open_http_svc/add_group_member"),
    method: "post",
    data: {
      GroupId: groupId,
      MemberList: [{ Member_Account: member }],
    },
  });
  return result;
};
export const restApi = async (req: Request, res: Response) => {
  const data = req.body;
  console.log("入参 restApi", data);
  const { params, funName = "" } = data;
  try {
    const result = await funName(params);
    console.log(`出参 restApi:${funName}`, result);
    res.status(200).json({ msg: "成功", result });
  } catch (error) {
    console.error(error)
    res.status(400).json({ msg: "失败" });
  }
};

