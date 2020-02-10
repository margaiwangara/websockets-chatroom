import { Request, Response, NextFunction } from 'express';

export default function asyncHandler(callback: Function) {
  return function(req: Request, res: Response, next: NextFunction) {
    return callback(req, res, next).catch(next);
  };
}
