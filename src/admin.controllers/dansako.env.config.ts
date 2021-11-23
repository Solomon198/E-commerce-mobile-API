import { Request, Response } from "express";
import * as firebaseAdmin from "firebase-admin";
import {
  ProcessingError,
  ProcessingSuccess,
} from "../RequestStatus/status";
import Constants from "../constants/index";

export default async function fetchVariables(
  req: Request, // eslint-disable-line
  res: Response,
) {
  try {
    const getVariables = await firebaseAdmin
      .firestore()
      .collection(Constants.Collections.APP_VARIABLES)
      .doc(Constants.Collections.VARIABLES_SUBCOLLECTION)
      .get();

    return ProcessingSuccess(res, getVariables.data());
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function setVariables(
  req: Request, // eslint-disable-line
  res: Response,
) {
  try {
    const data = req.body;
    await firebaseAdmin
      .firestore()
      .collection(Constants.Collections.APP_VARIABLES)
      .doc(Constants.Collections.VARIABLES_SUBCOLLECTION)
      .update(data);

    return ProcessingSuccess(res, data);
  } catch (e) {
    return ProcessingError(res, e);
  }
}
