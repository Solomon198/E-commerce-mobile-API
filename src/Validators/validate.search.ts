import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  InvalidInputs,
  ProcessingError,
} from "../RequestStatus/status";

const requestBodySchema = joi.object({
  searchQuery: joi.string().required(),
});

export default function ValidateSearch(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { error } = requestBodySchema.validate(req.query);
    if (error) {
      return InvalidInputs(res, error.message);
    }
    next();
  } catch (e) {
    return ProcessingError(res);
  }
}
