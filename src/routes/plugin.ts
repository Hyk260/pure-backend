import { Request, Response } from 'express';
import { log } from '../utils/logger';
import { getFunctionById } from '../api/plugin';

export const plugin = async (req: Request, res: Response): Promise<void> => {
  const apiName = req.params.apiName;
  const query = req.body.query;
  log(`apiName：${apiName}，query：${query}`);
  if (!apiName) {
    res.status(404).send({ msg: 'Not found' });
    return
  }
  if (!query) {
    res.status(404).send({ msg: 'query not found' });
    return
  }
  try {
    const selectedFunction = getFunctionById(apiName);
    const result = await selectedFunction(query);
    res.json({ code: 200, msg: "success", result });
  } catch (error) {
    res.status(500).send({ msg: (error as Error).message });
  }
}