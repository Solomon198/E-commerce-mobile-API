import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  InvalidInputs,
  ProcessingError,
} from "../RequestStatus/status";

const requestBodySchema = joi.object({
  userAuthorization: joi.string().allow("").optional(),
  transactionType: joi.number().required().max(1),
  parcelOwner: joi.string().required(),
  parcelPicker: joi.string().required(),
  parcelPrice: joi.number().required(),
  parcelOwnerPhoneNumber: joi.number().required(),
  distance: joi.number().required(),
  parcelLocationPhysicalAddress: joi.string().required(),
  parcelDestinationPhysicalAddress: joi.string().required(),
  parcelLocation: joi
    .array()
    .items(joi.number().required())
    .length(2)
    .required(),
  parcelDestination: joi
    .array()
    .items(joi.number().required())
    .length(2)
    .required(),
});

export default function ValidateParcelMiddleware(
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
