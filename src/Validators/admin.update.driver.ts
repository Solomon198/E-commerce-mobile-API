import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  InvalidInputs,
  ProcessingError,
} from "../RequestStatus/status";

const requestBodySchema = joi.object({
  userId: joi.string().optional().allow(""),
  firstName: joi.string().min(2).optional().allow(""),
  lastName: joi.string().min(2).optional().allow(),
  gender: joi.string().optional().allow(""),
  password: joi.string().min(8).optional().allow(""),
  driverLicense: joi.string().min(5).optional().allow(""),
  taxiLicense: joi.string().min(5).optional().allow(""),
  driverLicensePhoto: joi.string().uri().optional().allow(""),
  photo: joi.string().uri().optional().allow(""),
  guarrantorInformation: joi.object({
    fullName: joi.string().optional().min(5).allow(""),
    phoneNumber: joi.string().optional().min(8).allow(""),
    address: joi.string().min(4).optional().allow(""),
    ID: joi.string().min(6).optional().allow(""),
    email: joi.string().email().allow("").optional(),
    IDType: joi.string().max(3).min(2).optional().allow(""),
    placeOfWork: joi.string().allow("").optional(),
    positionAtWork: joi.string().allow("").optional(),
    addressOfPlaceOfWork: joi.string().allow("").optional(),
  }),
});

export default function ValidateUpdateDriverInformation(
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
