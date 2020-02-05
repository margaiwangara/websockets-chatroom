import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const loginGet = (req: Request, res: Response, next: NextFunction) => {
  return res.render('login', { title: 'Log In' });
};

export const loginPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check if username exists
  try {
    const newUser = await User.create(req.body);
  } catch (error) {
    console.log(error);
  }
};
