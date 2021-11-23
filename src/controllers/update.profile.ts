import { Request, Response } from "express";
import {
  ProcessingError,
  ProcessingSuccess,
} from "../RequestStatus/status";
import models from "../models/index";

export default async function UpdateUserInfo(
  req: Request,
  res: Response,
) {
  try {
    const { updates, userId } = req.body as any;
    const user = await models.Users.findOneAndUpdate(
      { userId },
      updates,
    );
    return ProcessingSuccess(res, user);
  } catch (e) {
    return ProcessingError(res);
  }
}
