import { Schema, model } from "mongoose";
import accountType from "../Types/account";

const Wallet: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
  amount: { type: Schema.Types.Number, default: 0 },
  account_number: { type: Schema.Types.String, default: "" },
  account_name: { type: Schema.Types.String, default: "" },
  bank_code: { type: Schema.Types.String, default: "" },
  recipient_code: { type: Schema.Types.String, default: "" },
  bank_name: { type: Schema.Types.String, default: "" },
});

export default model<accountType>("wallet", Wallet);
