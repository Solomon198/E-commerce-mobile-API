import { Request, Response, NextFunction } from "express";
import { getPhoneNumberInfo } from "../utills/utills";
import {
  ProcessingError,
  UserExist,
  InvalidInputs,
} from "../RequestStatus/status";
import models from "../models/index";
import Constant from "../constants/index";

// checks if user tried to signup with an existing unverified account then delete the account and proceed with the signup
export default async function HandleDuplicateSignUpMiddleWare(
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
        Constant.RequestResponse.InvalidPhoneNumber,
      );
    }

    res.locals.phoneNumber = intlFormat;

    const getUser = await models.Users.findOne({
      phoneNumber: intlFormat,
    });

    const getDriver = await models.Drivers.findOne({
      phoneNumber: intlFormat,
    });

    if (getUser || getDriver) {
      if (getUser) {
        if (getUser.isVerified) {
          return UserExist(res);
        }

        await models.Users.deleteMany({
          phoneNumber: intlFormat,
        });
      }

      if (getDriver) {
        if (getDriver.isVerified) {
          return UserExist(res);
        }
        await models.Drivers.deleteMany({
          phoneNumber: intlFormat,
        });
      }

      next();
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    return ProcessingError(res);
  }
}
