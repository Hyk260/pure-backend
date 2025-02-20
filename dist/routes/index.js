"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const market_json_1 = __importDefault(require("../db/market.json"));
const login_1 = require("../api/main/login");
const auth_1 = require("./auth");
const rest_api_1 = require("../api/rest-api");
const router = express_1.default.Router();
router.get("/test", (req, res) => {
    res.status(200).send({ msg: 'test' });
});
router.get("/market", (req, res) => {
    res.json(market_json_1.default);
});
/* POST 登录 */
router.post("/login", login_1.login);
/* POST im rest-api */
router.post("/rest-api", rest_api_1.restApi);
// GET github oauth
router.get("/auth/github", auth_1.authorize);
// GET github callback 
router.get("/auth/github/callback", auth_1.callback);
exports.default = router;
