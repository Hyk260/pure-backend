import express from 'express';
import market from '../db/market.json';
import { login } from "../api/main/login";
import { authorize, callback } from "./auth";
import { restApi } from "../api/rest-api";

const router: express.Router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ msg: 'test' });
});

router.get("/market", (req, res) => {
  res.json(market);
});

/* POST 登录 */
router.post("/login", login);
/* POST im rest-api */
router.post("/rest-api", restApi);
// GET github oauth
router.get("/auth/github", authorize);
// GET github callback 
router.get("/auth/github/callback", callback);

export default router;