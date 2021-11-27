import { Request, Response } from "express";
import { ProcessingError, ProcessingSuccess } from "../RequestStatus/status";
import { PostProps } from "../Types/post";
import models from "../models/index";
import { Types } from "mongoose";

require("dotenv/config");

// the middleware handles lot of stuffs that should have been done here
export async function CreatePost(req: Request, res: Response) {
  try {
    const { userId, title, description, category, coverImage, price } =
      req.body as PostProps;
    const postId = new Types.ObjectId();
    const newPost = new models.Post({
      title,
      description,
      category,
      coverImage,
      price: parseFloat(price as any), // eslint-disable-line
      userId,
      postId,
    });
    newPost._id = postId; // eslint-disable-line;

    await newPost.save({ validateBeforeSave: false });
    const post = await models.Post.findOne({ postId }).populate(
      "category userId"
    );
    return ProcessingSuccess(res, post);
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function fetchUserPosts(req: Request, res: Response) {
  try {
    const { userId } = req.body as any;
    const posts = await models.Post.find({ userId });
    return ProcessingSuccess(res, posts);
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function fetchFeeds(req: Request, res: Response) {
  try {
    const { budget, category, pageNumber, pageSize } = req.params as any;
    let query = {};
    if (budget) {
      query = { ...query, price: { $lte: parseInt(budget) } };
    }

    if (category) {
      query = { ...query, category };
    }

    const posts = await models.Post.paginate(query, {
      limit: pageSize || 10,
      page: pageNumber,
    });
    return ProcessingSuccess(res, {
      posts: posts.docs,
      totalDocs: posts.total,
      totalPages: posts.pages,
    });
  } catch (e) {
    return ProcessingError(res);
  }
}
