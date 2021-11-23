import { Request, Response } from "express";
import { firestore } from "firebase-admin";
import {
  ProcessingError,
  ProcessingSuccess,
} from "../RequestStatus/status";
import models from "../models/index";
import {
  sendNotification,
  sendPaystackRequest,
} from "../utills/utills";
import Constants from "../constants/index";
import firebasePaths from "../constants/firebasePaths";
import Card from "../Types/card";

// Add Users Credit Card
export async function AddCreditCard(req: Request, res: Response) {
  try {
    const { cardNumber, userId, reference, email } = req.body as {
      cardNumber: string;
      userId: string;
      reference: string;
      email: string;
    };

    // Verify that the transaction was successful
    const verifyPayment = await sendPaystackRequest({
      url: `https://api.paystack.co/transaction/verify/${reference}`,
      method: "GET",
    });

    const { data } = verifyPayment.data; // payload for verification
    if (data.status === "success") {
      // if driver or user is charged
      const { authorization_code } = data.authorization; //eslint-disable-line
      const { paid_at, amount, reference } = data as any; //eslint-disable-line

      // Creating a new card for the user
      const newCard = new models.Cards({
        authorization: authorization_code,
        cardNumber,
        userId,
        email,
      });

      // CHECK IF USER THAT ADD CARD IS A DRIVER OR A USER
      const isUser = await models.Users.findOne({ userId });

      // Record the transaction for reference purpose
      const newTransactionHistory = new models.TransactionHistory({
        user: userId,
        status: "success",
        driver: userId,
        amount: amount / 100,
        parcel: [],
        date: new Date(),
        paidAt: new Date(paid_at),
        reference,
        userId,
      });

      if (isUser) {
        newCard.outStandingDiscount = true; // user will have a discount on first transaction
        newTransactionHistory.message =
          Constants.ResponseMessages.USER_CARD_CHARGED_REASON;

        // send A an inapp notification to user;
        // gets the registration token of user
        if (process.env.NODE_ENV === "production") {
          const getUserToken = await firestore()
            .collection(firebasePaths.USERS)
            .doc(userId)
            .get();
          if (getUserToken.exists) {
            const userData = getUserToken.data();
            await sendNotification(
              "Card Verified",
              "#50  will be discounted from your first trip",
              userData?.token,
            );
          }
        }
      } else {
        // Credit the driver wallet with amount charged to test card
        await models.Wallet.updateOne(
          { userId },
          { $inc: { amount: amount / 100 } },
        );

        // get the registration token of driver
        if (process.env.NODE_ENV === "production") {
          const getUserToken = await firestore()
            .collection(firebasePaths.DRIVERS)
            .doc(userId)
            .get();
          if (getUserToken.exists) {
            const driverData = getUserToken.data();
            await sendNotification(
              "Card Verified",
              "#50 have been added to your Dansako Account",
              driverData?.data().token,
            );
          }
        }

        newCard.outStandingDiscount = false;
        newTransactionHistory.message =
          Constants.ResponseMessages.DRIVER_CARD_CHARGES_REASON;
      }

      await newTransactionHistory.save(); // save transactionHistory
      await newCard.save(); // save new Card Added

      return ProcessingSuccess(res, {
        authorization: authorization_code,
        cardNumber,
      });
    }

    // if card was not successfully charged charge could not be verified
    return ProcessingError(
      res,
      Constants.ResponseMessages.COULD_NOT_CHARGE_CARD,
    );
  } catch (e) {
    console.log(e);
    return ProcessingError(res);
  }
}

export async function GetCard(req: Request, res: Response) {
  try {
    const { userId } = req.params as { userId: string };
    const card = await models.Cards.findOne({ userId });
    return ProcessingSuccess(res, card);
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function DeleteCard(req: Request, res: Response) {
  try {
    const { authorization } = req.params as {
      authorization: string;
    };

    const { outStandingDiscount, userId } =
      (await models.Cards.findOne({
        authorization,
      })) as Card;

    const getDebt = await models.DebtManager.findOne({ userId });
    if (getDebt) {
      const { amount } = getDebt;
      if (
        amount >=
        Constants.UtilsConstants.MAXIMUM_DEBT_BEFORE_ACCOUNT_DISABLE
      ) {
        const isUser = await models.Users.find({ userId });
        if (isUser) {
          return ProcessingError(
            res,
            Constants.ResponseMessages
              .UNABLE_TO_CHARGE_CARD_ACCESS_DENIAL,
          );
        }
        const ref = firestore()
          .collection(firebasePaths.DRIVERS)
          .doc(userId);
        await ref.update({ accountDisabled: true });
        return ProcessingError(
          res,
          Constants.ResponseMessages
            .UNABLE_TO_CHARGE_CARD_ACCESS_DENIAL,
        );
      }
    }

    if (outStandingDiscount) {
      return ProcessingError(
        res,
        Constants.ResponseMessages
          .CANNOT_REMOVE_CARD_PENDING_DISCOUNT,
      );
    }

    await models.Cards.deleteOne({
      authorization,
    });
    return ProcessingSuccess(res, { authorization });
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function cardExist(req: Request, res: Response) {
  try {
    const { cardNumber, userId } = req.body as {
      cardNumber: string;
      userId: string;
    };

    const userHasCard = await models.Cards.findOne({
      userId,
    });

    if (userHasCard) {
      return ProcessingError(
        res,
        Constants.ResponseMessages.CANNOT_HAVE_TWO_BILLING_CARDS,
      );
    }

    const card = await models.Cards.findOne({
      cardNumber,
    });

    if (card) {
      // return error with card alreay in use
      return ProcessingError(
        res,
        Constants.ResponseMessages.CARD_ALREADY_IN_USE,
      );
    }
    return ProcessingSuccess(res, { cardNumber });
  } catch (e) {
    return ProcessingError(res);
  }
}
