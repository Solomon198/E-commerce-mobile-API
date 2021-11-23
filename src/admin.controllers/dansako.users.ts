import { Request, Response } from "express";
import * as mongoose from "mongoose";
import {
  ProcessingError,
  ProcessingSuccess,
  SignUpSuccess,
} from "../RequestStatus/status";
import models from "../models/index";
import Constants from "../constants/index";

export async function searchUsers(req: Request, res: Response) {
  try {
    const { searchQuery } = req.query;
    const findMatchUsers = await models.Users.find({
      $text: { $search: searchQuery as string },
    });
    return ProcessingSuccess(res, findMatchUsers);
  } catch (e) {
    return ProcessingError(res);
  }
}

export default async function fetchUsers(
  req: Request,
  res: Response,
) {
  try {
    const { page } = req.query as any;

    const getUsers = await models.Users.paginate(
      {
        isVerified: true,
      },
      {
        limit: Constants.UtilsConstants.QUERY_BADGE_SIZE,
        page,
        sort: { _id: -1 },
      },
    );
    return ProcessingSuccess(res, getUsers.docs);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function disableAccount(req: Request, res: Response) {
  try {
    const { userId } = req.params as any;

    await models.Users.updateOne(
      { userId },
      { accountDisabled: true },
    );

    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function enableAccount(req: Request, res: Response) {
  try {
    const { userId } = req.params as any;

    await models.Users.updateOne(
      { userId },
      { accountDisabled: false },
    );

    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function addUserAsAdmin(req: Request, res: Response) {
  try {
    const { userId } = req.params as any;

    await models.Users.updateOne({ userId }, { isAdmin: true });

    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function removeUserFromAdmin(
  req: Request,
  res: Response,
) {
  try {
    const { userId } = req.params as any;

    await models.Users.updateOne({ userId }, { isAdmin: false });

    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function updateUserInformation(
  req: Request,
  res: Response,
) {
  try {
    const updates = req.body as any;
    const getUser = (await models.Users.findOne({
      userId: updates.userId,
    })) as any;
    if (!getUser) return ProcessingError(res);
    if (updates.password) {
      getUser.setPassword(updates.password);
    }
    Object.keys(updates).forEach((key) => {
      if (key === "firstName") {
        getUser.firtName = updates.firstName;
      }
      getUser[key] = updates[key];
    });
    await getUser.save();
    return ProcessingSuccess(res, getUser);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function CreateUser(req: Request, res: Response) {
  try {
    const userVerifiedPhoneNumber = res.locals.phoneNumber;
    const phoneNumber = userVerifiedPhoneNumber as string;
    const { firstName, lastName, gender, password, photo } =
      req.body as {
        firstName: string;
        lastName: string;
        gender: string;
        accountType: string;
        password: string;
        photo: string;
      };

    // create user,generate password and token
    const user = new models.Users();
    /* eslint-disable */
    let _id = mongoose.Types.ObjectId();
    /* eslint-enable */
    user.phoneNumber = phoneNumber;

    user.isVerified = true;

    user.photo = photo;

    /* eslint-disable */
    user.userId = _id;
    user._id = _id;
    /* eslint-enable */

    user.firtName = firstName;

    user.lastName = lastName;

    user.gender = gender;

    user.localPhoneNumber = req.body.phoneNumber;

    user.setPassword(password);

    const createDebtDocument = new models.DebtManager({
      driver: _id,
      user: _id,
      userId: _id,
      amount: 0,
      parcel: [],
    });

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

export async function CreateAdminUser(req: Request, res: Response) {
  try {
    const userVerifiedPhoneNumber = res.locals.phoneNumber;
    const phoneNumber = userVerifiedPhoneNumber as string;
    const { firstName, lastName, gender, password, photo } =
      req.body as {
        firstName: string;
        lastName: string;
        gender: string;
        accountType: string;
        password: string;
        photo: string;
      };

    // create user,generate password and token
    const user = new models.Users();
    /* eslint-disable */
    let _id = mongoose.Types.ObjectId();
    /* eslint-enable */
    user.phoneNumber = phoneNumber;

    user.isVerified = true;

    user.photo = photo;

    /* eslint-disable */
    user.userId = _id;
    user._id = _id;
    /* eslint-enable */

    user.firtName = firstName;

    user.lastName = lastName;

    user.gender = gender;

    user.isAdmin = true;

    user.localPhoneNumber = req.body.phoneNumber;

    user.setPassword(password);

    const createDebtDocument = new models.DebtManager({
      driver: _id,
      user: _id,
      userId: _id,
      amount: 0,
      parcel: [],
    });

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
