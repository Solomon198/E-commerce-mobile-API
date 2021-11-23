import { Document } from "mongoose";

interface Account extends Document {
  userId: string;
  amount: number;
  /* eslint-disable */
  account_number: string;
  bank_code: string;
  account_name: string;
  recipient_code: string;
  bank_name: string;
  /* eslint-enable */
}

export default Account;
