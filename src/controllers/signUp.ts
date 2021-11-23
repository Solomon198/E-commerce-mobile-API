import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { ProcessingError, SignUpSuccess } from "../RequestStatus/status";
import models from "../models/index";

// the middleware handles lot of stuffs that should have been done here
export default async function SignUp(req: Request, res: Response) {
  try {
    const userVerifiedPhoneNumber = res.locals.phoneNumber;
    const phoneNumber = userVerifiedPhoneNumber as string;
    const { firstName, lastName, gender, password, lecturerToken } =
      req.body as {
        firstName: string;
        lastName: string;
        gender: string;
        accountType: string;
        password: string;
        lecturerToken: string;
      };

    // create user,generate password and token
    const user = new models.Users();
    /* eslint-disable */
    let _id = mongoose.Types.ObjectId();
    /* eslint-enable */
    user.phoneNumber = phoneNumber;

    if (lecturerToken === "aazz1100") {
      user.isLecturer = true;
    }
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
