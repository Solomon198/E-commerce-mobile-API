import { Request, Response } from "express";
import {
  ProcessingError,
  ProcessingSuccess,
  InvalidCredential,
} from "../RequestStatus/status";
import { decodeJwtToken, getTokens } from "../utills/utills";
import User from "../Types/user";

export default async function RefreshAccessToken(
  req: Request,
  res: Response,
) {
  try {
    const { refreshToken } = req.body;
    try {
      const payload = decodeJwtToken(refreshToken) as User; // throws error if not valid
      const tokens: any = getTokens(payload);
      delete tokens.refreshToken;
      return ProcessingSuccess(res, tokens);
    } catch (e) {
      return InvalidCredential(res);
    }
  } catch (e) {
    ProcessingError(res);
  }
}
