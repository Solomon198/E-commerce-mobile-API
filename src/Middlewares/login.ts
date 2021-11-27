import { Request, Response, NextFunction } from "express";
import { getPhoneNumberInfo } from "../utills/utills";
import {
  ProcessingError,
  UnVerifiedAccount,
  InvalidCredential,
  InvalidInputs,
} from "../RequestStatus/status";
import models from "../models/index";
import Constants from "../constants/index";
// checks if user tried to login with an unverified account
export default async function HandleUnverifiedAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { phoneNumber, countryCode } = req.body as {
      phoneNumber: string;
      countryCode: string;
    };

    let intlFormat: string;

    try {
      intlFormat = await getPhoneNumberInfo(phoneNumber, countryCode);
    } catch (e) {
      return InvalidInputs(res, Constants.RequestResponse.InvalidPhoneNumber);
    }

    res.locals.phoneNumber = intlFormat;

    const getUser = await models.Users.findOne({
      phoneNumber: intlFormat,
    });

    if (getUser) {
      if (getUser) {
        if (!getUser.isVerified) {
          return UnVerifiedAccount(res);
        }
      }
      next();
    } else {
      return InvalidCredential(res);
    }
  } catch (e) {
    return ProcessingError(res);
  }
}
