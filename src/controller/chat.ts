import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/asyncHandler';
import Chat from '../models/Chat';

/**
 * @desc Get all chats
 * @route GET
 * @access PRIVATE
 */
export const getChats = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const chats = await Chat.find();

    return res.status(200).json({
      success: true,
      count: chats.length,
      data: chats,
    });
  },
);

/**
 * @desc Get single chats
 * @route GET
 * @access PRIVATE
 */
export const getChat = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);

    return res.status(200).json(chat);
  },
);

/**
 * @desc Get all chats
 * @route GET
 * @access PRIVATE
 */
/**
 * @desc Get all chats
 * @route GET
 * @access PRIVATE
 */
/**
 * @desc Get all chats
 * @route GET
 * @access PRIVATE
 */
