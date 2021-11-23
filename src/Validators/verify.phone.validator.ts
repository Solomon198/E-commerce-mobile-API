import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  InvalidInputs,
  ProcessingError,
} from "../RequestStatus/status";

const requestBodySchema = joi.object({
  phoneNumber: joi.string().required().min(8),
  countryCode: joi.string().length(2).required(),
});

export default function ValidateNumberVerificationUpMiddleWare(
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
