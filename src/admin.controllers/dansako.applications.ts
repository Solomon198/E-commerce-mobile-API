import { Request, Response } from "express";
import {
  ProcessingError,
  ProcessingSuccess,
} from "../RequestStatus/status";
import models from "../models/index";
import Constants from "../constants/index";

export default async function fetchApplications(
  req: Request,
  res: Response,
) {
  try {
    const { page } = req.query as any;

    const getApplication = await models.Drivers.paginate(
      {
        isActivated: false,
        isVerified: true,
        applicationDeclined: false,
      },
      {
        limit: Constants.UtilsConstants.QUERY_BADGE_SIZE,
        page,
        sort: { _id: -1 },
      },
    );
    return ProcessingSuccess(res, getApplication.docs);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function AcceptApplication(req: Request, res: Response) {
  try {
    const { userId } = req.body as any;

    await models.Drivers.updateOne({ userId }, { isActivated: true });
    // send text message to user
    // send push notification

    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function DeclineApplication(
  req: Request,
  res: Response,
) {
  try {
    const { userId, reason } = req.body as any;

    await models.Drivers.updateOne(
      { userId },
      { isActivated: false, applicationDeclined: true },
    );
    // send text message to user
    // send push notification
    console.log(reason);

    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res, e);
  }
}
