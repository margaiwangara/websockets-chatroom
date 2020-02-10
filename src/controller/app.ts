import { Request, Response, NextFunction } from 'express';

/**
 * @desc Display homepage
 * @route GET /
 * @access PRIVATE
 */
export const homePage = function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // render homepage middlewaer will be placed during routing
  const { user }: object | any = req.session;
  return res.render('home', { title: 'Home', user });
};
