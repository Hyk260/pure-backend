import express from 'express';
import market from '../db/market.json';
import {
  authorize,
  callback
} from "./auth";

const router: express.Router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ msg: 'test' });
});

router.get("/market", (req, res) => {
  res.json(market);
});

// GET github oauth
router.get("/auth/github", authorize);
// GET github callback 
router.get("/auth/github/callback", callback);

export default router;