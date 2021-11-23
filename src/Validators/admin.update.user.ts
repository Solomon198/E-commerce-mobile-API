import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  InvalidInputs,
  ProcessingError,
} from "../RequestStatus/status";

const requestBodySchema = joi.object({
  firstName: joi.string().min(2).optional(),
  lastName: joi.string().min(2).optional(),
  gender: joi.string().optional(),
  photo: joi.string().uri().optional().allow(""),
  password: joi.string().min(8).required().optional().allow(""),
  email: joi.string().email().optional().allow(""),
  userId: joi.string().required(),
});

export default function ValidateUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction,
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
