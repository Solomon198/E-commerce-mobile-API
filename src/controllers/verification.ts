import { Response, Request } from "express";
import * as moment from "moment";
// import * as Twilio from "twilio";
import {
  InvalidInputs,
  ProcessingError,
  ProcessingSuccess,
  UnAuthorized,
  InvalidCredential,
  LastPinNotTimout,
  MaxPinTrialExceeded,
} from "../RequestStatus/status";
import {
  getPhoneNumberInfo,
  phoneNumberExist,
  GeneratePin,
  encodeToJwtToken,
  decodeJwtToken,
  getTokens,
} from "../utills/utills";
import models from "../models/index";
import { NumverifyResponseType } from "../Types/numverifyResponse";
import Constants from "../constants/index";
import User from "../Types/user";
import Driver from "../Types/driver";
// import globalConfigs from "../core/enivronment.config";

// const configs = globalConfigs();
// const client = Twilio(configs.TWILIO_ACCOUNT_SID, configs.TWILIO_AUTH_TOKEN);
require("dotenv/config");

export async function SinchCall(req: Request, res: Response) {
  const { phoneNumber, countryCode } = req.body as {
    phoneNumber: string;
    countryCode: string;
  };

  if (!phoneNumber || !countryCode) return InvalidInputs(res);
  try {
    const intlFormat = await getPhoneNumberInfo(phoneNumber, countryCode);

    const PhoneNumberExist = await phoneNumberExist(intlFormat);

    if (!PhoneNumberExist) return InvalidCredential(res);

    // check if user have is asking for a token when 3 minutes is not exhausted yet
    const now = new Date();
    const userVerificationinfo = await models.Verification.findOne({
      phoneNumber: intlFormat,
    });
    if (userVerificationinfo) {
      if (userVerificationinfo.lastTimePinRequested) {
        if (userVerificationinfo.lastTimePinRequested > now) {
          return LastPinNotTimout(res);
        }
      }
    }

    const PIN = GeneratePin();

    const token = encodeToJwtToken(
      { intlFormat },
      Constants.TokenExpiry.VERIFICATION_TOKENS
    );

    await models.Verification.deleteMany({ phoneNumber: intlFormat });

    // saving credentials in secure database
    const saveCred = new models.Verification();
    saveCred.phoneNumber = intlFormat;
    saveCred.pin = PIN.split(",").join("");
    saveCred.token = token;
    saveCred.date = new Date();
    saveCred.lastTimePinRequested = moment(new Date()).add(
      Constants.Timers.TIME_BEFORE_NEXT_PIN_REQUEST,
      "minutes"
    );
    saveCred.pinTrialDuration = moment(new Date()).add(
      Constants.Timers.TIME_BEFORE_PIN_TRIAL_ELAPSE,
      "minutes"
    );

    await saveCred.save(); // save document

    if (process.env.NODE_ENV === "production") {
      return ProcessingSuccess(res, {
        token,
        pin: PIN.split(",").join(""),
      });
      // code goes here
      // client.messages
      //   .create({
      //     to: intlFormat,
      //     from: configs.TWILIO_PHONE_NUMBER,
      //     body: `Your Dansako verification code is ${PIN.split(
      //       ',',
      //     ).join('')}`,
      //   })
      //   .then(() => {
      //     ProcessingSuccess(res, {
      //       token,
      //     });
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    }
    return ProcessingSuccess(res, {
      token,
      pin: PIN.split(",").join(""),
    });
  } catch (error) {
    console.log(error);
    return ProcessingError(res);
  }
}

export async function SinchSMS(req: Request, res: Response) {
  const { phoneNumber, countryCode } = req.body as {
    phoneNumber: string;
    countryCode: string;
  };

  if (!phoneNumber || !countryCode) return InvalidInputs(res);
  try {
    const intlFormat = await getPhoneNumberInfo(phoneNumber, countryCode);

    const PhoneNumberExist = await phoneNumberExist(intlFormat);

    if (!PhoneNumberExist) return InvalidCredential(res);

    // check if user have is asking for a token when 3 minutes is not exhausted yet
    const now = new Date();
    const userVerificationinfo = await models.Verification.findOne({
      phoneNumber: intlFormat,
    });

    if (userVerificationinfo) {
      if (userVerificationinfo.lastTimePinRequested) {
        if (userVerificationinfo.lastTimePinRequested > now) {
          return LastPinNotTimout(res);
        }
      }
    }

    const PIN = GeneratePin();

    const token = encodeToJwtToken(
      { intlFormat },
      Constants.TokenExpiry.VERIFICATION_TOKENS
    );

    await models.Verification.deleteMany({ phoneNumber: intlFormat });

    // saving credentials in secure database
    const saveCred = new models.Verification();
    saveCred.phoneNumber = intlFormat;
    saveCred.pin = PIN.split(",").join("");
    saveCred.token = token;
    saveCred.date = new Date();
    saveCred.lastTimePinRequested = moment(new Date()).add(
      Constants.Timers.TIME_BEFORE_NEXT_PIN_REQUEST,
      "minutes"
    );

    saveCred.pinTrialDuration = moment(new Date()).add(
      Constants.Timers.TIME_BEFORE_PIN_TRIAL_ELAPSE,
      "minutes"
    );

    await saveCred.save(); // save document
    if (process.env.NODE_ENV === "production") {
      // code goes here
      console.log(PIN.split(",").join(""));
      return ProcessingSuccess(res, {
        token,
        pin: PIN.split(",").join(""),
      });
      // client.messages
      //   .create({
      //     to: intlFormat,
      //     from: configs.TWILIO_PHONE_NUMBER,
      //     body: `Your Dansako verification code is ${PIN.split(
      //       ',',
      //     ).join('')}`,
      //   })
      //   .then(() => {
      //     ProcessingSuccess(res, {
      //       token,
      //     });
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    }
    ProcessingSuccess(res, {
      token,
      pin: PIN.split(",").join(""),
    });
  } catch (error) {
    console.log(error);
    return ProcessingError(res);
  }
}

export async function verifyCode(req: Request, res: Response) {
  try {
    const { pin, token } = req.body as { pin: string; token: string };
    if (!pin || !token) return InvalidInputs(res);

    let decode: NumverifyResponseType;

    try {
      decode = decodeJwtToken(token) as NumverifyResponseType;
    } catch (e) {
      return UnAuthorized(res, Constants.ResponseMessages.TOKEN_EXPIRE);
    }
    const { intlFormat } = decode;

    const getDoc = await models.Verification.findOne({
      phoneNumber: intlFormat,
    });

    let phoneNumber: string;
    let vCode: string;

    if (getDoc) {
      phoneNumber = getDoc.phoneNumber;
      vCode = getDoc.pin;
    } else {
      return UnAuthorized(res);
    }

    if (getDoc.pinTrialDuration) {
      const now = new Date();
      if (getDoc.pinTrialDuration > now) {
        if (getDoc.pinTrials >= Constants.Timers.MAX_PIN_TRIAL_ATTEMPTS) {
          return MaxPinTrialExceeded(res);
        }
      }
    }

    if (intlFormat === phoneNumber && pin === vCode) {
      const user = await models.Users.findOneAndUpdate(
        { phoneNumber: intlFormat },
        { $set: { isVerified: true } },
        { useFindAndModify: false }
      );

      const driver = await models.Drivers.findOneAndUpdate(
        { phoneNumber: intlFormat },
        { $set: { isVerified: true } },
        { useFindAndModify: false }
      );

      if (user) {
        const objectifyBSON = user.toObject() as User;
        const tokens = getTokens(objectifyBSON.userId as any);
        const { accessToken } = tokens;
        const { refreshToken } = tokens;

        return ProcessingSuccess(res, {
          accessToken,
          refreshToken,
          user,
        });
      }
      if (driver) {
        const objectifyBSON = driver.toJSON() as Driver;
        const tokens = getTokens(objectifyBSON.userId as any);
        const { accessToken } = tokens;
        const { refreshToken } = tokens;

        return ProcessingSuccess(res, {
          accessToken,
          refreshToken,
          user: driver,
        });
      }
      return UnAuthorized(res, Constants.ResponseMessages.INVALID_CREDENTIALS);
    }

    await getDoc.incrementPinTrial();

    return UnAuthorized(
      res,
      Constants.ResponseMessages.INCORRECT_VERIFICATION_PIN
    );
  } catch (error) {
    console.log(error);
    return ProcessingError(res);
  }
}
