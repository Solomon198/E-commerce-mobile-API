import { Request, Response, NextFunction } from "express";
import { getPhoneNumberInfo } from "../utills/utills";
import {
  ProcessingError,
  UnVerifiedAccount,
  InvalidCredential,
  InvalidInputs,
  AccountNotActivated,
} from "../RequestStatus/status";
import models from "../models/index";
import Constants from "../constants/index";
// checks if user tried to login with an unverified account
export default async function HandleUnverifiedAccount(
  req: Request,
  res: Response,
  next: NextFunction,
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
      return InvalidInputs(
        res,
        Constants.RequestResponse.InvalidPhoneNumber,
      );
    }

    res.locals.phoneNumber = intlFormat;

    const getUser = await models.Users.findOne({
      phoneNumber: intlFormat,
    });

    const driver = await models.Drivers.findOne({
      phoneNumber: intlFormat,
    });

    if (getUser || driver) {
      if (getUser) {
        if (!getUser.isVerified) {
          return UnVerifiedAccount(res);
        }
      }

      if (driver) {
        if (!driver.isVerified) {
          return UnVerifiedAccount(res);
        }

        if (!driver.isActivated) {
          return AccountNotActivated(res);
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
