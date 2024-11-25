import path from 'path';
import { Request, Response } from 'express';
export const getRootHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
};
