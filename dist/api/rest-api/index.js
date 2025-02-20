"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restApi = exports.addGroupMember = exports.restSendMsg = exports.accountImport = exports.accountCheck = void 0;
const rest_api_1 = require("../../http/rest-api");
const utils_1 = require("./utils");
// 用于查询自有账号是否已导入即时通信 IM，支持批量查询。
// https://cloud.tencent.com/document/product/269/38417
const accountCheck = async (params) => {
    try {
        const result = await rest_api_1.http.request({
            url: "v4/im_open_login_svc/account_check",
            method: "post",
            data: { CheckItem: params },
        });
        return result.ResultItem?.[0]?.AccountStatus === "Imported";
    }
    catch (error) {
        console.error('Account check failed:', error);
        return false;
    }
};
exports.accountCheck = accountCheck;
// 导入单个账号
const accountImport = async (params) => {
    try {
        const result = await rest_api_1.http.request({
            url: "v4/im_open_login_svc/account_import",
            method: "post",
            data: { ...params },
        });
        return result.ErrorCode === 0;
    }
    catch (error) {
        console.error('Account import failed:', error);
        return false;
    }
};
exports.accountImport = accountImport;
// 单发单聊消息
// https://cloud.tencent.com/document/product/269/2282
const restSendMsg = async (params) => {
    const { From_Account, To_Account, Text } = params;
    const result = await rest_api_1.http.request({
        url: "v4/openim/sendmsg",
        method: "post",
        data: {
            SyncOtherMachine: 1, // 消息同步1 不同步 2
            From_Account,
            To_Account,
            // MsgSeq: "",
            MsgRandom: (0, utils_1.generateRandomInt32)(),
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
exports.restSendMsg = restSendMsg;
// 拉人入群
const addGroupMember = async (params) => {
    const { groupId, member } = params;
    const result = await rest_api_1.http.request({
        url: "v4/group_open_http_svc/add_group_member",
        method: "post",
        data: {
            GroupId: groupId,
            MemberList: [{ Member_Account: member }],
        },
    });
    return result;
};
exports.addGroupMember = addGroupMember;
// API路由处理
const API_METHODS = {
    accountCheck: exports.accountCheck,
    accountImport: exports.accountImport,
    restSendMsg: exports.restSendMsg,
    addGroupMember: exports.addGroupMember
};
const restApi = async (req, res) => {
    const { params = {}, funName } = req.body;
    if (!funName || !(funName in API_METHODS)) {
        res.status(404).json({ msg: "Invalid function name" });
    }
    try {
        const result = await API_METHODS[funName](params);
        res.status(200).json({ success: true, result: result });
    }
    catch (error) {
        console.error(`API Error [${funName}]:`, error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.restApi = restApi;
