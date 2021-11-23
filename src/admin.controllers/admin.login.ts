import { Request, Response } from "express";
import {
  LoginSuccess,
  InvalidCredential,
  ProcessingError,
  SuspendUser,
} from "../RequestStatus/status";
import models from "../models";
import { getTokens } from "../utills/utills";
import User from "../Types/user";
// the middlewares handle most of the checks that should have been done here
export default async function loginAccount(
  req: Request,
  res: Response,
) {
  try {
    const formattedPhoneNumber = res.locals.phoneNumber;
    const phoneNumber = formattedPhoneNumber as string;
    const { password } = req.body as {
      password: string;
    };
    const doc = await models.Users.findOne({ phoneNumber });

    if (!doc) return InvalidCredential(res);

    // return forbiddend user suspended as error if acount is locked
    if (doc.isAccountLocked()) return SuspendUser(res);

    if (doc.validatePassword(password)) {
      // check if user is an admin
      if (!doc.isAdmin) {
        return InvalidCredential(res);
      }
      // credentials successful login
      const responseObj: any = doc.toObject();
      delete responseObj.hash;
      delete responseObj.salt;
      delete responseObj.__v; //eslint-disable-line
      delete responseObj.loginAttempts;

      const tokens = getTokens(responseObj as User);

      return LoginSuccess(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        responseObj,
      );
    }

    await doc.lockAccount();

    return InvalidCredential(res);
  } catch (e) {
    return ProcessingError(res);
  }
}
