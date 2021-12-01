import { Request, Response } from "express";
import { ProcessingError, ProcessingSuccess } from "../RequestStatus/status";
import { PostProps } from "../Types/post";
import models from "../models/index";
import { Types } from "mongoose";

require("dotenv/config");

// the middleware handles lot of stuffs that should have been done here
export async function CreatePost(req: Request, res: Response) {
  try {
    const { userId, title, description, category, coverImage, price, postId } =
      req.body as PostProps;
    if (!postId) {
      const newPostId = new Types.ObjectId();
      const newPost = new models.Post({
        title,
        description,
        category,
        coverImage,
        price: parseFloat(price as any), // eslint-disable-line
        userId,
        newPostId,
        date: new Date(),
      });
      newPost._id = newPostId; // eslint-disable-line;

      await newPost.save({ validateBeforeSave: false });
      const post = await models.Post.findOne({ postId: newPostId }).populate(
        "category userId"
      );
      return ProcessingSuccess(res, post);
    }
    const updatePost = await models.Post.updateOne(
      { postId: Types.ObjectId(postId as any) },
      {
        coverImage,
        price,
        category,
        title,
        description,
      },
      {
        new: true,
      }
    );
    return ProcessingSuccess(res, updatePost);
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function fetchUserPosts(req: Request, res: Response) {
  try {
    const { userId } = req.query as any;
    const posts = await models.Post.find({ userId }).sort({ date: -1 });
    return ProcessingSuccess(res, posts);
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function fetchFeeds(req: Request, res: Response) {
  try {
    const { budget, category, pageNumber, pageSize } = req.query as any;
    let query = {};
    if (budget) {
      query = { ...query, price: { $lte: parseInt(budget) } };
    }

    if (category) {
      query = { ...query, category };
    }

    const posts = await models.Post.paginate(query, {
      limit: parseInt(pageSize + "") || 10, // eslint-disable-line
      page: parseInt(pageNumber + ""), // eslint-disable-line
      populate: "userId category",
      sort: { date: -1 },
    });
    return ProcessingSuccess(res, {
      posts: posts.docs,
      totalDocs: posts.total,
      totalPages: posts.pages,
    });
  } catch (e) {
    console.log(e);
    return ProcessingError(res);
  }
}
