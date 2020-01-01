import { Request, Response } from 'express';

const heartbeat = (_: Request, res: Response) => {
  res.json({ message: 'ok', timestamp: new Date() });
};

export { heartbeat };
