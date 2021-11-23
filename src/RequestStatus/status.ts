import { Response } from "express";
import STATUS_CODES from "./codes";
import Constants from "../constants/index";

// LOGIN SUCCESS
export const LoginSuccess = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  payload: any,
) => {
  res.status(STATUS_CODES.OK.CODE).json({
    message: STATUS_CODES.OK.STATUS_TEXT,
    accessToken,
    refreshToken,
    payload,
  });
};

// INVALID CREDENTIALS
export const InvalidCredential = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.ResponseMessages.INVALID_CREDENTIALS,
    error: Constants.RequestResponse.InvalidCredential,
  });
};

// SUSPENDS USER
export const SuspendUser = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.ResponseMessages.USER_SUSPENDED,
    error: Constants.RequestResponse.UserSuspended,
  });
};

// Max pin exceeded by USER
export const MaxPinTrialExceeded = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.ResponseMessages.MAX_PIN_TRIAL,
    error: Constants.RequestResponse.MAX_TRIALS_EXCEEDED,
  });
};

// last pin request not timout for USER
export const LastPinNotTimout = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.ResponseMessages.PIN_NOT_TIMED_OUT,
    error: Constants.RequestResponse.PinNotTimeOut,
  });
};

// INVALID PASSWORD
export const InvalidPassword = (res: Response) => {
  res.status(STATUS_CODES.UNAUTHORIZED.CODE).json({
    message: Constants.ResponseMessages.INCORRECT_PASSWORD,
    error: Constants.RequestResponse.InvalidPassword,
  });
};

// SIGN UP STATUS
export const SignUpSuccess = (res: Response, payload: any) => {
  res.status(STATUS_CODES.OK.CODE).json({
    message: STATUS_CODES.OK.STATUS_TEXT,
    payload,
  });
};

// signup Failure
export const UserExist = (res: Response) => {
  res.status(STATUS_CODES.CONFLICT.CODE).json({
    message: Constants.ResponseMessages.USER_EXIST,
    error: Constants.RequestResponse.UserExist,
  });
};

// VALIDATING INPUT
export const InvalidInputs = (res: Response, message?: string) => {
  res.status(STATUS_CODES.BAD_REQUEST.CODE).json({
    message,
    error: Constants.RequestResponse.InvalidInput,
  });
};

// VALIDATING INPUT
export const InvalidRequest = (res: Response, message?: string) => {
  res.status(STATUS_CODES.BAD_REQUEST.CODE).json({
    message,
    error: Constants.RequestResponse.INVALID_REQUEST,
  });
};

// PROCESSING ERROR
export const ProcessingError = (res: Response, message?: string) => {
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.CODE).json({
    message: message || Constants.ResponseMessages.SERVER_ERROR,
    error: Constants.RequestResponse.ServerError,
  });
};

// PROCESSING SUCCESS
export const ProcessingSuccess = (res: Response, data: any) => {
  res.status(STATUS_CODES.OK.CODE).json({
    message: STATUS_CODES.OK.STATUS_TEXT,
    payload: data,
  });
};
// AUTH

// UNAUTHORIZED
export const UnAuthorized = (res: Response, message?: string) => {
  res.status(STATUS_CODES.UNAUTHORIZED.CODE).json({
    error: Constants.RequestResponse.UnAuthorizedRequest,
    message: message || Constants.ResponseMessages.UNAUTHORIZED,
  });
};

// resource created
export const ResourceCreated = (res: Response, data: any) => {
  res.status(STATUS_CODES.CREATED.CODE).json({
    message: STATUS_CODES.CREATED.STATUS_TEXT,
    payload: data,
  });
};

// invalid Account
export const UnVerifiedAccount = (res: Response) => {
  res.status(STATUS_CODES.INVALID_ACCOUNT.CODE).json({
    message: Constants.ResponseMessages.UNVERIFIED_ACCOUNT,
    error: Constants.RequestResponse.AccountNotVerified,
  });
};

export const PICKUP_ACTION_FORBIDDEN = (
  res: Response,
  message?: string,
) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message:
      message || Constants.ResponseMessages.PARCEL_ALREADY_ACCEPTED,
    error: Constants.RequestResponse.NotAllowed,
  });
};

export const AccountNotActivated = (
  res: Response,
  message?: string,
) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: message || Constants.ResponseMessages.USER_NOT_ACTIVATED,
    error: Constants.RequestResponse.UserNotActivated,
  });
};
