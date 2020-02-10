import express, { Request, Response, NextFunction } from 'express';

export function loginAuthorized(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // check if username exists in session
  const { user }: object | any = req.session;

  if (user) {
    return next();
  }

  return res.redirect('/login');
}

export function userAuthorized(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user }: object | any = req.session;

  if (user) {
    return res.redirect('/');
  }

  return next();
}
