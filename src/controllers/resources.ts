import { Request, Response } from 'express';
import models from '../models/index';
import {
  ProcessingError,
  ProcessingSuccess,
  InvalidPassword,
  InvalidCredential,
} from '../RequestStatus/status';
import { sendPaystackRequest } from '../utills/utills';

export default async function GetBanks(req: Request, res: Response) {
  try {
    const banks = await sendPaystackRequest({
      method: 'GET',
      url: 'https://api.paystack.co/bank',
    });

    return ProcessingSuccess(res, banks.data.data);
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function AddCheckoutAccount(
  req: Request,
  res: Response,
) {
  try {
    const {
      account_name, // eslint-disable-line
      bank_code, // eslint-disable-line
      account_number, // eslint-disable-line
      userId,
      password,
    } = req.body;
    const user = await models.Drivers.findOne({ userId });

    if (!user) return InvalidCredential(res);
    if (!user.validatePassword(password)) {
      return InvalidPassword(res);
    }
    const createReciepient = await sendPaystackRequest({
      method: 'POST',
      url: 'https://api.paystack.co/transferrecipient',
      data: {
        account_number,
        account_name,
        bank_code,
        type: 'nuban',
        currency: 'NGN',
      },
    });
    const { recipient_code, details } = createReciepient.data.data; // eslint-disable-line
    await models.Wallet.findOneAndUpdate(
      { userId },
      {
        account_number,
        bank_code,
        account_name,
        recipient_code,
        bank_name: details.bank_name,
      },
    );
    return ProcessingSuccess(res, {
      account_number,
      bank_code,
      account_name,
      recipient_code,
      bank_name: details.bank_name,
    });
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function ConfirmAccountNumber(
  req: Request,
  res: Response,
) {
  try {
    const { account_number, bank_code } = req.query; // eslint-disable-line
    const accountDetails = await sendPaystackRequest({
      method: 'GET',
      url: 'https://api.paystack.co/bank/resolve',
      params: {
        account_number,
        bank_code,
      },
    });

    return ProcessingSuccess(res, accountDetails.data.data);
  } catch (e) {
    console.log(e);
    return ProcessingError(res);
  }
}

export async function GetDriversFinancialAccountDetails(
  req: Request,
  res: Response,
) {
  try {
    const { userId } = req.query as any;
    const driver = await models.Wallet.findOne({ userId });
    if (!driver) return ProcessingError(res);
    return ProcessingSuccess(res, driver);
  } catch {
    return ProcessingError(res);
  }
}

export async function DriverRequestWithDrawal(
  req: Request,
  res: Response,
) {
  try {
    const { userId, amount } = req.body;
    const getAccountDetails = await models.Wallet.findOne({ userId });
    if (!getAccountDetails) return ProcessingError(res);
    if (getAccountDetails.amount < parseFloat(amount)) {
      return ProcessingError(res, 'Insufficient funds !!!');
    }

    // initiate paystack transfer request
    // DONT DO THIS HERE MOVE TO WEBHOOK
    await sendPaystackRequest({
      method: 'POST',
      url: 'https://api.paystack.co/transfer',
      data: {
        source: 'balance',
        reason: 'Driver withdrawals',
        amount: parseFloat(amount) * 100,
        recipient: getAccountDetails.recipient_code,
      },
    });
    const driver = await models.Wallet.updateOne(
      { userId },
      { $inc: { amount: -amount } },
    );
    const updatedAccountDetails = await models.Wallet.findOne({
      userId,
    });

    if (!driver) return ProcessingError(res);
    return ProcessingSuccess(res, updatedAccountDetails);
  } catch {
    return ProcessingError(res);
  }
}
