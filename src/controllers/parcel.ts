import { Request, Response } from "express";
import { firestore } from "firebase-admin";
import {
  InvalidRequest,
  ProcessingError,
  ProcessingSuccess,
} from "../RequestStatus/status";
import Constants from "../constants/index";
import { Parcel } from "../Types/parcel";

import {
  chargeUserAuthorization,
  sendNotification,
} from "../utills/utills";
import { TransactionType } from "../constants/enums";
import models from "../models/index";
import Card from "../Types/card";

require("dotenv/config");

// the middleware handles lot of stuffs that should have been done here
export async function CreateParcel(req: Request, res: Response) {
  try {
    const queryBody = req.body as Parcel;
    queryBody.parcelStatus = Constants.Enums.NOT_PICKED as any;

    const $user = await firestore()
      .collection(Constants.Collections.USERS)
      .doc(queryBody.parcelOwner)
      .get();

    const user = $user.exists ? $user.data() : null;

    const $driver = await firestore()
      .collection(Constants.Collections.DRIVERS)
      .doc(queryBody.parcelPicker)
      .get();

    const driver = $driver.exists ? $driver.data() : null;

    const addParcel = await firestore()
      .collection(Constants.Collections.ACTIVE_DELIVERIES)
      .add({
        ...queryBody,
        date: new Date(),
      });

    try {
      // send notification to user for parcel creation
      if (user) {
        await sendNotification(
          "Dansako - Parcel Created",
          "You can cancel parcel delivery as long as parcel is not picked up by driver",
          user.token,
        );
      }

      if (driver) {
        await sendNotification(
          "Dansako - New Delivery",
          `${user?.firtName || user?.firstName} ${
            user?.lastName
          } has requested you pick up a parcel, you make a call to confirm pick up location`,
          driver.token,
        );
      }
    } catch (e) {
      console.log(e);
      // e
    }

    return ProcessingSuccess(res, { parcelId: addParcel.id });
  } catch (e) {
    console.log(e);
    return ProcessingError(res);
  }
}

export async function ParcelPicked(req: Request, res: Response) {
  try {
    const { parcelId } = req.body as any;

    const parcelRef = firestore()
      .collection(Constants.Collections.ACTIVE_DELIVERIES)
      .doc(parcelId);

    await parcelRef.update({
      parcelStatus: Constants.Enums.IN_PROGRESS,
    });

    const parcel: Parcel = (await parcelRef.get()).data() as any;

    const $user = await firestore()
      .collection(Constants.Collections.USERS)
      .doc(parcel.parcelOwner)
      .get();

    const user = $user.exists ? $user.data() : null;

    if (user) {
      try {
        await sendNotification(
          "Dansako - Parcel Picked",
          "parcel have been picked up. you will get notified when parcel is at your location",
          user.token,
        );
      } catch (e) {
        // cons
      }
    }

    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function ParcelDelivered(req: Request, res: Response) {
  try {
    const { parcelId } = req.body as any;

    const parcelRef = firestore()
      .collection(Constants.Collections.ACTIVE_DELIVERIES)
      .doc(parcelId);

    await parcelRef.update({
      parcelStatus: Constants.Enums.PICKUP_DELIVERED,
    });

    const parcel: Parcel = (await parcelRef.get()).data() as any;

    const $user = await firestore()
      .collection(Constants.Collections.USERS)
      .doc(parcel.parcelOwner)
      .get();

    const user = $user.exists ? $user.data() : null;
    if (user) {
      try {
        await sendNotification(
          "Dansako - Parcel have been delivered",
          "parcel have been delivered, please confirm that parcel is been delivered",
          user.token,
        );
      } catch (e) {
        console.log(e);
      }
    }
    return ProcessingSuccess(res, {});
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function ConfirmDelivery(req: Request, res: Response) {
  try {
    const { parcelId } = req.body as any;

    // reference to parcel
    const parcelRef = firestore()
      .collection(Constants.Collections.ACTIVE_DELIVERIES)
      .doc(parcelId);

    // get the parcel
    const parcel: Parcel = (await parcelRef.get()).data() as any;

    // Get information about the parcelOwner
    const $user = await firestore()
      .collection(Constants.Collections.USERS)
      .doc(parcel.parcelOwner)
      .get();

    const user = $user.exists ? $user.data() : null;
    // Get information about the Driver
    const $driver = await firestore()
      .collection(Constants.Collections.DRIVERS)
      .doc(parcel.parcelPicker)
      .get();

    const driver = $driver.exists ? $driver.data() : null;

    // Get the parcel using ref
    const finishedRide = await parcelRef.get();
    // Get the parcel data
    const finishData = finishedRide.data() as any;
    finishData.date = finishData.date.toDate();
    finishData.parcelStatus = Constants.Enums.DELIVERY_CONFIRMED;
    const newParcel = new models.Parcel(finishData);
    // eslint-disable-next-line radix
    const rideMoney: number = parseFloat(
      finishData.parcelPrice as string,
    );

    const platformPercentage =
      Constants.UtilsConstants.PLATFORM_PERCENTAGE_CHARGE_PER_TRIP /
      100;
    const platformCharges = platformPercentage * rideMoney;
    const driversMoney = rideMoney - platformCharges;

    // credit drivers wallet;
    await models.Wallet.updateOne(
      { userId: finishData.parcelPicker },
      {
        $inc: { amount: driversMoney },
      },
    );

    if (finishData.transactionType === TransactionType.CASH) {
      let authorization: string;
      let email: string;

      const cardInfo = await models.Cards.findOne({
        userId: finishData.parcelPicker,
      });

      if (platformCharges >= 50 && cardInfo) {
        authorization = cardInfo.authorization;
        email = cardInfo.email;
        let chargeStatus = "";
        let transaction: any;

        if (process.env.NODE_ENV === "production") {
          const chargeDriver = await chargeUserAuthorization(
            email,
            platformCharges,
            authorization,
          );
          transaction = chargeDriver;
          chargeStatus = chargeDriver.data.data.status;
        } else {
          chargeStatus = "failed";
        }

        if (chargeStatus === "success") {
          const {
            paid_at, // eslint-disable-line
            amount,
            reference,
          } = transaction.data.data;
          const newTransactionHistory = new models.TransactionHistory(
            {
              user: finishData.parcelPicker,
              status: "success",
              driver: finishData.parcelPicker,
              amount: amount / 100,
              parcel: [finishData._id], // eslint-disable-line
              paidAt: new Date(paid_at),
              reference,
              userId: finishData.parcelPicker,
            },
          );
          await newTransactionHistory.save();
        } else {
          await models.DebtManager.updateOne(
            {
              userId: finishData.parcelPicker,
            },
            {
              $push: { parcel: finishData._id }, // eslint-disable-line
              $inc: { amount: platformCharges },
            },
          );
        }
      } else {
        await models.DebtManager.updateOne(
          {
            userId: finishData.parcelPicker,
          },
          {
            $push: { parcel: finishData._id }, // eslint-disable-line
            $inc: { amount: platformCharges },
          },
        );
      }
    } else {
      const { email, authorization, outStandingDiscount } =
        (await models.Cards.findOne({
          userId: finishData.parcelOwner,
        })) as Card;

      let outstanding = 0;

      if (outStandingDiscount) {
        outstanding = 50;
        await models.Cards.updateOne(
          { authorization, email },
          { outStandingDiscount: false },
        );
      }

      const tripPrice = rideMoney - outstanding;
      if (tripPrice >= 5000) {
        let paymentVerificationStatus = "";
        let transaction: any;
        if (process.env.NODE_ENV === "production") {
          const verifyPayment = await chargeUserAuthorization(
            email,
            tripPrice,
            authorization,
          );
          transaction = verifyPayment;
          paymentVerificationStatus = verifyPayment.data.data.status;
        }

        if (paymentVerificationStatus === "success") {
          const newTransactionHistory = new models.TransactionHistory(
            {
              user: finishData.parcelPicker,
              status: "success",
              driver: finishData.parcelPicker,
              amount: transaction.data.data.amount / 100,
              parcel: [finishData._id], // eslint-disable-line
              paidAt: new Date(transaction.data.data.paid_at),
              reference: transaction.data.data.reference,
              userId: finishData.parcelPicker,
            },
          );
          await newTransactionHistory.save();
        } else {
          await models.DebtManager.updateOne(
            {
              userId: finishData.parcelOwner,
            },
            {
              $push: { parcel: finishData._id }, // eslint-disable-line
              $inc: { amount: tripPrice },
            },
          );
        }
      } else {
        await models.DebtManager.updateOne(
          {
            userId: finishData.parcelOwner,
          },
          {
            $push: { parcel: finishData._id }, // eslint-disable-line
            $inc: { amount: tripPrice },
          },
        );
      }
    }

    await newParcel.save();

    await parcelRef.delete();
    try {
      if (driver || user) {
        const driverTokens = driver ? driver.token : [];
        const userTokens = user ? user.token : [];
        sendNotification(
          "Dansako - Delivery Confirmed",
          "Parcel devlivery have been confirmed successfully !!! ",
          [...driverTokens, ...userTokens],
        );
      }
    } catch (e) {
      console.log(e);
    }
    return ProcessingSuccess(res, {});
  } catch (e) {
    console.log(e);
    return ProcessingError(res);
  }
}

export async function ParcelDeliveryCancelled(
  req: Request,
  res: Response,
) {
  try {
    const { parcelId, isDriver } = req.body as any;

    const parcelRef = firestore()
      .collection(Constants.Collections.ACTIVE_DELIVERIES)
      .doc(parcelId);

    const parcel: Parcel = (await parcelRef.get()).data() as any;

    const $user = await firestore()
      .collection(Constants.Collections.USERS)
      .doc(parcel.parcelOwner)
      .get();

    const user = $user.exists ? $user.data() : null;

    const $driver = await firestore()
      .collection(Constants.Collections.DRIVERS)
      .doc(parcel.parcelPicker)
      .get();

    const driver = $driver.exists ? $driver.data() : null;

    const finishedRide = await parcelRef.get();
    const $data: Parcel = finishedRide.data() as any;

    // due to network lags, ensure parcel is not cancel when it is in progress from server
    if ($data.parcelStatus > Constants.Enums.NOT_PICKED) {
      return InvalidRequest(
        res,
        Constants.ResponseMessages.CANCEL_PICKED_PARCEL,
      );
    }
    const finishData: any = $data as any;
    finishData.date = finishData.date.toDate();

    if (isDriver) {
      finishData.driverReject = true;
    } else {
      finishData.userReject = true;
    }
    finishData.parcelStatus =
      Constants.Enums.PARCEL_DELIVERY_CANCELLED;

    const newParcel = new models.Parcel(finishData);

    await newParcel.save();

    await parcelRef.delete();

    try {
      if (!isDriver) {
        if (driver) {
          sendNotification(
            "Dansako - Delivery Cancelled",
            `Delivery have been cancelled by ${user?.firtName} ${user?.lastName}`,
            driver.token,
          );
        }
      }

      if (user) {
        sendNotification(
          "Dansako - Delivery Cancelled",
          "Delivery have been cancelled by driver",
          user.token,
        );
      }
    } catch (e) {
      console.log(e);
    }
    return ProcessingSuccess(res, {});
  } catch (e) {
    console.log(e);
    return ProcessingError(res);
  }
}

export async function fetchUserParcels(req: Request, res: Response) {
  try {
    const { page, userId } = req.query as any;
    const fetchParcel = await models.Parcel.paginate(
      {
        parcelOwner: userId,
      },
      {
        limit: Constants.UtilsConstants.QUERY_BADGE_SIZE,
        page,
        populate: {
          path: "parcelPicker",
        },
        sort: { date: -1 },
      },
    );
    return ProcessingSuccess(res, fetchParcel.docs);
  } catch (e) {
    return ProcessingError(res, e as any);
  }
}

export async function fetchDriverParcels(
  req: Request,
  res: Response,
) {
  try {
    const { page, userId } = req.query as any;

    const fetchParcel = await models.Parcel.paginate(
      {
        parcelPicker: userId,
      },
      {
        limit: Constants.UtilsConstants.QUERY_BADGE_SIZE,
        page,
        sort: { date: -1 },
        populate: {
          path: "parcelOwner",
        },
      },
    );
    return ProcessingSuccess(res, fetchParcel.docs);
  } catch (e) {
    return ProcessingError(res, e as any);
  }
}
