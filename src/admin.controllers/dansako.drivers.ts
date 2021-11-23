import * as firebaseAdmin from "firebase-admin";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
import {
  ProcessingError,
  ProcessingSuccess,
  SignUpSuccess,
} from "../RequestStatus/status";
import models from "../models/index";
import Constants from "../constants/index";
import firebasePaths from "../constants/firebasePaths";

export async function searchDrivers(req: Request, res: Response) {
  try {
    const { searchQuery } = req.query;
    const findMatchDrivers = await models.Drivers.find({
      $text: { $search: searchQuery as string },
    });
    return ProcessingSuccess(res, findMatchDrivers);
  } catch (e) {
    return ProcessingError(res);
  }
}
export default async function fetchDrivers(
  req: Request,
  res: Response,
) {
  try {
    const { page } = req.query as any;

    const getDrivers = await models.Drivers.paginate(
      {
        isActivated: true,
        isVerified: true,
      },
      {
        limit: Constants.UtilsConstants.QUERY_BADGE_SIZE,
        page,
        sort: { _id: -1 },
      },
    );
    return ProcessingSuccess(res, getDrivers.docs);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function disableAccount(req: Request, res: Response) {
  try {
    const { userId } = req.params as any;

    await models.Drivers.updateOne(
      { userId },
      { accountDisabled: true },
    );
    await firebaseAdmin
      .firestore()
      .collection(firebasePaths.DRIVERS)
      .doc(userId)
      .update({
        accountDisabled: true,
      });

    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function enableAccount(req: Request, res: Response) {
  try {
    const { userId } = req.params as any;

    await models.Drivers.updateOne(
      { userId },
      { accountDisabled: false },
    );
    await firebaseAdmin
      .firestore()
      .collection(firebasePaths.DRIVERS)
      .doc(userId)
      .update({
        accountDisabled: false,
      });
    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function updateDriverInformation(
  req: Request,
  res: Response,
) {
  try {
    const updates = req.body as any;
    const getDriver = (await models.Drivers.findOne({
      userId: updates.userId,
    })) as any;
    if (!getDriver) return ProcessingError(res);
    if (updates.password) {
      getDriver.setPassword(updates.password);
    }
    Object.keys(updates).forEach((key) => {
      getDriver[key] = updates[key];
    });
    await getDriver.save();
    return ProcessingSuccess(res, getDriver);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function CreateDriver(req: Request, res: Response) {
  try {
    const userVerifiedPhoneNumber = res.locals.phoneNumber;
    const phoneNumber = userVerifiedPhoneNumber as string;
    const { password } = req.body as {
      password: string;
    };

    // create user,generate password and token
    const user = new models.Drivers(req.body);
    /* eslint-disable */
    let _id = mongoose.Types.ObjectId();
    /* eslint-enable */

    /* eslint-disable */
    user.userId = _id;
    user._id = _id;
    /* eslint-enable */
    user.phoneNumber = phoneNumber;

    user.localPhoneNumber = req.body.phoneNumber;

    user.isVerified = true;

    user.setPassword(password);
    const createWallet = new models.Wallet({
      userId: _id,
      amount: 0,
    });

    const createDebtDocument = new models.DebtManager({
      driver: _id,
      user: _id,
      userId: _id,
      amount: 0,
      parcel: [],
    });

    await createWallet.save();
    await createDebtDocument.save();
    const $user = await user.save({ validateBeforeSave: false });

    const responseObj: any = $user.toObject();
    delete responseObj.hash;
    delete responseObj.salt;
    delete responseObj.__v; //eslint-disable-line
    delete responseObj.loginAttempts;

    return SignUpSuccess(res, responseObj);
  } catch (e) {
    return ProcessingError(res);
  }
}
