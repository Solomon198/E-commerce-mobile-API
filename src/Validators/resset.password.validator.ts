import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  InvalidInputs,
  ProcessingError,
} from "../RequestStatus/status";

const requestBodySchema = joi.object({
  accessToken: joi.string().required(),
  password: joi
    .string()
    .min(8)
    // .pattern(new RegExp(/^[A-Za-z]\w{7,14}$/))
    .required(),
  // .error(new Error(Constants.Validations.INVALID_PASSWORD)),
});

export default function ValidatePasswordRessetMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { error } = requestBodySchema.validate(req.body);
    if (error) {
      console.log(error.message);
      return InvalidInputs(res, error.message);
    }
    next();
  } catch (e) {
    return ProcessingError(res);
  }
}
