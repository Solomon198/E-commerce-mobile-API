import * as jwt from "jsonwebtoken";
import {
  PhoneNumberFormat as PNF,
  PhoneNumberUtil,
} from "google-libphonenumber";

import * as firebaseAdmin from "firebase-admin";
import axios from "axios";
import models from "../models/index";
import constants from "../constants/index";
import userType from "../Types/user";
import Configs from "../core/enivronment.config";
import privateKey from "../private.key";
import publicKey from "../public.key";

/* eslint-enbalie */

require("dotenv/config");

const { JWT_ALGO, PAYSTACK_SECRET } = Configs();
type requestConfigs = {
  url: string;
  data?: any;
  method: "POST" | "GET" | "PUT";
  params?: any;
};

export async function sendPaystackRequest(
  configs: requestConfigs,
  headers?: any,
) {
  return axios({
    ...configs,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export async function chargeUserAuthorization(
  email: string,
  chargeAmount: number,
  authorization: string,
) {
  const amount = chargeAmount * 100;
  const chargeUser = await sendPaystackRequest({
    url: "https://api.paystack.co/transaction/charge_authorization",
    method: "POST",
    data: {
      email,
      amount: amount.toString(),
      authorization_code: authorization, //eslint-disable-line
    },
  });

  const { data } = chargeUser.data;
  return sendPaystackRequest({
    url: `https://api.paystack.co/transaction/verify/${data.reference}`,
    method: "GET",
  });
}

export function sendNotification(
  title: string,
  body: string,
  tokens: string[],
) {
  return firebaseAdmin.messaging().sendMulticast({
    notification: {
      title,
      body,
    },
    tokens,
    android: {
      priority: "high",
      notification: {
        priority: "high",
        sound: "default",
      },
    },
  });
}

export function encodeToJwtToken(
  data: any,
  expire?: number | string,
) {
  const signOptions: jwt.SignOptions = {
    algorithm: JWT_ALGO as jwt.Algorithm,
  };
  if (expire) {
    signOptions.expiresIn = expire;
  }

  try {
    const token = jwt.sign(data, privateKey, signOptions);
    return token;
  } catch (e) {
    throw new Error((e as any).message);
  }
}

export function decodeJwtToken(token: string) {
  try {
    const verified = jwt.verify(token, publicKey, {
      algorithms: [JWT_ALGO as jwt.Algorithm],
    });
    if (verified instanceof Error) {
      const response = verified as jwt.TokenExpiredError;
      throw new Error(response.message);
    }

    return verified;
  } catch (err) {
    const error = err as jwt.TokenExpiredError;
    throw error;
  }
}

export function getTokens(userCreds: userType) {
  try {
    const accessToken = encodeToJwtToken(
      {
        userId: userCreds,
      },
      constants.TokenExpiry.ACCESS_TOKENS,
    );
    const refreshToken = encodeToJwtToken(userCreds);

    return { accessToken, refreshToken };
  } catch (e) {
    throw new Error((e as any).message);
  }
}

export function GeneratePin() {
  return (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1)
    .split("")
    .join(",");
}

export async function getPhoneNumberInfo(
  phone: string,
  countryCode: string,
) {
  try {
    // Get an instance of `PhoneNumberUtil`.
    const phoneUtil = PhoneNumberUtil.getInstance();

    // Parse number with country code and keep raw input.
    const number = phoneUtil.parseAndKeepRawInput(phone, countryCode);

    // Print the phone's
    const phoneNumber = phoneUtil.format(number, PNF.E164);

    return phoneNumber;
  } catch (err) {
    throw new Error((err as any).message);
  }
}

export async function phoneNumberExist(phoneNumber: string) {
  try {
    const doc = await models.Users.findOne({
      phoneNumber,
    });

    const driver = await models.Drivers.find({ phoneNumber });

    if (doc || driver) {
      return true;
    }

    return false;
  } catch (e) {
    throw new Error((e as any).message);
  }
}

export function CheckPassword(pwd: string) {
  const passw = /^[A-Za-z]\w{7,14}$/;

  if (passw.test(pwd)) {
    return true;
  }
  return false;
}
