import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import { InvalidInputs, ProcessingError } from "../RequestStatus/status";

const requestBodySchema = joi.object({
  coverImage: joi.string().required().label("Cover Image"),
  title: joi.string().required().label("Title"),
  description: joi.string().required().label("description"),
  price: joi.string().required(),
  category: joi.string().required(),
  userId: joi.string().required(),
  postId: joi.string().allow(""),
});

export default function ValidatePostMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { error } = requestBodySchema.validate(req.body);
    if (error) {
      return InvalidInputs(res, error.message);
    }
    next();
  } catch (e) {
    return ProcessingError(res);
  }
}
