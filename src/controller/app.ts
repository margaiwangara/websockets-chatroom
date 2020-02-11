import { Request, Response, NextFunction } from 'express';
import chatSocket from '../handlers/chats';
import Chat from '../models/Chat';
import asyncHandler from '../utils/asyncHandler';

/**
 * @desc Display homepage
 * @route GET /
 * @access PRIVATE
 */
export const homePage = asyncHandler(async function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // render homepage middlewaer will be placed during routing
  const { user }: object | any = req.session;
  // get all chats and sort in ascending order
  const chats = await Chat.find()
    .sort('-createdAt')
    .populate({ path: 'user', select: 'username _id' });

  return res.render('home', {
    title: 'Home',
    user,
    chats,
  });
});
