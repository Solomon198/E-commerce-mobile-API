import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {
  InvalidInputs,
  ProcessingError,
} from '../RequestStatus/status';

const requestBodySchema = joi.object({
  amount: joi
    .number()
    .min(1000)
    .required()
    .label('Withdrawal Amount'),
  userId: joi.string().required(),
});

export default function ValidateWithdrawal(
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
