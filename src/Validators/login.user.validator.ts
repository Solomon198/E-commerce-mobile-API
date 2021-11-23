import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  InvalidInputs,
  ProcessingError,
} from "../RequestStatus/status";
import Constants from "../constants/index";

const requestBodySchema = joi.object({
  phoneNumber: joi.string().required().min(8),
  countryCode: joi.string().length(2).required(),
  password: joi
    .string()
    .min(8)
    .required()
    .error(new Error(Constants.ResponseMessages.INVALID_PASSWORD)),
});

export default function ValidateLoginMiddleWare(
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
