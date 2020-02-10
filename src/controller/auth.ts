import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import asyncHandler from '../utils/asyncHandler';

/**
 * @desc Display login page
 * @route GET /login
 * @access PUBLIC
 */
export const userLoginGet = function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // render login get
  return res.render('login', { title: 'Log In' });
};

/**
 * @desc Submit Login form
 * @route POST /login
 * @access Public
 */
export const userLoginPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // grab data from form
    const { username } = req.body;

    if (!username) return;

    // check if username exists in db
    const userExists = await User.findOne({ username });

    // if exists pass session and id into session else create then pass into session
    if (userExists) {
      (req.session as any).user = {
        id: userExists._id,
        username: userExists.username,
      };
    } else {
      const newUser = await User.create({ username });

      (req.session as any).user = {
        id: newUser._id,
        username: newUser.username,
      };
    }

    // redirect to home
    return res.redirect('/');
  },
);

/**
 * @desc Log Out
 * @route GET /login
 * @access Private
 */
export const userLogout = function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.session?.destroy(error => {
    if (error) {
      return res.redirect('/');
    }
    // clear cookie
    res.clearCookie('auth');
    return res.redirect('/login');
  });
};
