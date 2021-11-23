import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  InvalidInputs,
  ProcessingError,
} from "../RequestStatus/status";

const requestBodySchema = joi.object({
  account_number: joi.string().required(),
  bank_code: joi.string().required(),
  account_name: joi.string().required(),
  userId: joi.string().required(),
  password: joi.string().required(),
});

export default function ValidateAddCheckoutAccount(
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
