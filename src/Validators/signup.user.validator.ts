import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import { InvalidInputs, ProcessingError } from "../RequestStatus/status";

const requestBodySchema = joi.object({
  phoneNumber: joi.string().required().min(8),
  countryCode: joi.string().length(2).required(),
  firstName: joi.string().min(2).required(),
  lastName: joi.string().min(2).required(),
  photo: joi.string().uri().optional().allow(""),
  gender: joi.string().required(),
  lecturerToken: joi.string().allow(""),
  password: joi.string().min(8).required(),
});

export default function ValidateSignUpMiddleWare(
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
