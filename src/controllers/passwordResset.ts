import { Response, Request } from "express";
import {
  ProcessingError,
  ProcessingSuccess,
  UnAuthorized,
} from "../RequestStatus/status";
import { decodeJwtToken, getTokens } from "../utills/utills";
import models from "../models/index";
import User from "../Types/user";

require("dotenv/config");

export default async function RessetPassword(
  req: Request,
  res: Response,
) {
  try {
    const { password, accessToken } = req.body as {
      password: string;
      accessToken: string;
    };

    let decode: User;

    try {
      decode = decodeJwtToken(accessToken) as User;
    } catch (e) {
      return UnAuthorized(res);
    }

    const { userId } = decode;

    let getDoc: any;

    const user = await models.Users.findOne({
      userId,
    });

    if (user) getDoc = user;

    const driver = await models.Drivers.findOne({ userId });

    if (driver) getDoc = driver;

    if (!getDoc) return UnAuthorized(res);

    getDoc.setPassword(password);

    await getDoc.save();

    const tokens = getTokens(getDoc.toObject() as User);

    return ProcessingSuccess(res, tokens);
  } catch (error) {
    return ProcessingError(res);
  }
}
