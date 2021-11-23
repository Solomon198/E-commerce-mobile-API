import { Request, Response } from "express";
import { Types } from "mongoose";
import {
  ProcessingError,
  ProcessingSuccess,
} from "../RequestStatus/status";
import models from "../models/index";
import Constants from "../constants/index";

export async function FetchAllParcel(req: Request, res: Response) {
  try {
    const { page } = req.query as any;

    const getApplication = await models.Parcel.paginate(
      {},
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

export async function FetchUserAnalytics(
  req: Request,
  res: Response,
) {
  try {
    const { userId } = req.params as any;

    const completedTrips = await models.Parcel.find({
      parcelOwner: userId,
      parcelStatus: Constants.Enums.DELIVERY_CONFIRMED,
    }).countDocuments();

    const cancelledTrips = await models.Parcel.find({
      parcelOwner: userId,
      parcelStatus: Constants.Enums.PARCEL_DELIVERY_CANCELLED,
    }).countDocuments();

    const totalMoneySpent = await models.Parcel.aggregate([
      {
        $match: {
          parcelOwner: Types.ObjectId(userId),
          parcelStatus: Constants.Enums.DELIVERY_CONFIRMED,
        },
      },
      {
        $group: { _id: null, total: { $sum: "$parcelPrice" } },
      },
    ]);
    const computeResult = {
      completedTrips,
      cancelledTrips,
      totalMoneySpent: totalMoneySpent[0]?.total,
    };

    return ProcessingSuccess(res, computeResult);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function FetchDriverAnalytics(
  req: Request,
  res: Response,
) {
  try {
    const { userId } = req.params as any;

    const completedTrips = await models.Parcel.find({
      parcelPicker: userId,
      parcelStatus: Constants.Enums.DELIVERY_CONFIRMED,
    }).countDocuments();

    const cancelledTrips = await models.Parcel.find({
      parcelPicker: userId,
      parcelStatus: Constants.Enums.PARCEL_DELIVERY_CANCELLED,
    }).countDocuments();

    const balance = await models.Wallet.findOne({ userId });
    const totalMoneyEarned = await models.Parcel.aggregate([
      {
        $match: {
          parcelPicker: Types.ObjectId(userId),
          parcelStatus: Constants.Enums.DELIVERY_CONFIRMED,
        },
      },
      {
        $group: { _id: null, total: { $sum: "$parcelPrice" } },
      },
    ]);
    const computeResult = {
      completedTrips,
      cancelledTrips,
      balance: balance?.amount,
      totalMoneyEarned: totalMoneyEarned[0]?.total,
    };

    return ProcessingSuccess(res, computeResult);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function FetchTrips(req: Request, res: Response) {
  try {
    const { userId, isDriver, status } = req.query as any;

    const query =
      isDriver != 'true' // eslint-disable-line
        ? { parcelOwner: userId }
        : { parcelPicker: userId };

    const completedTrips = await models.Parcel.find({
      ...query,
      parcelStatus:
        parseInt(status) == 3 //eslint-disable-line
          ? Constants.Enums.DELIVERY_CONFIRMED
          : Constants.Enums.PARCEL_DELIVERY_CANCELLED,
    })
      .limit(100)
      .sort({ _id: -1 })
      .populate("parcelOwner parcelPicker");

    return ProcessingSuccess(res, completedTrips);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function FetchAllTrips(req: Request, res: Response) {
  try {
    const { status } = req.query as any;

    const trips = await models.Parcel.find({
      parcelStatus: parseInt(status), // eslint-disable-line
    })
      .sort({ _id: -1 })
      .populate("parcelOwner parcelPicker");

    return ProcessingSuccess(res, trips);
  } catch (e) {
    return ProcessingError(res, e);
  }
}

export async function FetchAllAdminAccount(
  req: Request, // eslint-disable-line
  res: Response,
) {
  try {
    const adminAcounts = await models.Users.find({
      isAdmin: true, // eslint-disable-line
    });

    return ProcessingSuccess(res, adminAcounts);
  } catch (e) {
    return ProcessingError(res, e);
  }
}
