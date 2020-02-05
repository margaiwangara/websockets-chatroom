import { Request, Response, NextFunction } from 'express';

function userAuthorized(req: Request, res: Response, next: NextFunction) {
  // check if username exists in session
  const session: any = req.session;

  if (session.username) {
    return next();
  }

  return res.redirect('/login');
}

export default userAuthorized;
