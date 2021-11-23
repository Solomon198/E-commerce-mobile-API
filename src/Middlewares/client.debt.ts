import { Request, Response, NextFunction } from "express";
import { ProcessingError } from "../RequestStatus/status";
import models from "../models/index";
import constants from "../constants";

export default async function CheckUserDebt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { parcelOwner } = req.body as {
      parcelOwner: string;
    };

    const userId = parcelOwner;

    const getDebt = await models.DebtManager.findOne({
      userId,
      amount: {
        $gte: constants.UtilsConstants
          .MAXIMUM_DEBT_BEFORE_ACCOUNT_DISABLE,
      },
    });
    if (getDebt) {
      return ProcessingError(
        res,
        constants.ResponseMessages
          .UNABLE_TO_CHARGE_CARD_ACCESS_DENIAL,
      );
    }
    next();
  } catch (e) {
    return ProcessingError(res);
  }
}
