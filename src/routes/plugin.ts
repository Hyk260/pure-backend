import { Request, Response } from 'express';

export const plugin = (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    res.json(id);
  } else {
    res.status(404).send({ msg: 'Not found' });
  }
}