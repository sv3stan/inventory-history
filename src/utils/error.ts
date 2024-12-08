import { Response } from 'express';

export const handleError = (res: Response, err: any) => {
  console.error(err);

  if (err.message === 'Invalid input data') {
    return res
      .status(400)
      .json({ error: 'Required fields are missing or invalid' });
  } else if (err.message === 'Stock not found') {
    return res.status(404).json({ error: 'Stock not found' });
  } else if (err.message === 'Insufficient stock for operation') {
    return res
      .status(400)
      .json({ error: 'Insufficient stock for the operation' });
  }

  if (err.code === '23505') {
    return res.status(409).json({ error: 'Duplicate entry found' });
  }

  if (err instanceof Error) {
    return res
      .status(500)
      .json({ error: 'Internal server error: ' + err.message });
  }

  return res.status(500).json({ error: 'Internal server error' });
};
