import { Schema, model } from "mongoose";
import { TransactionHistoryTypes } from "../Types/transactionHistory";

const TransactionHistory: Schema = new Schema({
  driver: Schema.Types.ObjectId,
  user: Schema.Types.ObjectId,
  amount: Schema.Types.Number,
  parcel: [
    { type: Schema.Types.ObjectId, required: true, ref: "Parcel" },
  ],
  date: { type: Schema.Types.Date, default: new Date() },
  status: { type: Schema.Types.String, enum: ["success", "failed"] },
  message: Schema.Types.String,
  paidAt: Schema.Types.Date,
  reference: Schema.Types.String,
  userId: Schema.Types.String,
});

export default model<TransactionHistoryTypes>(
  "transactionhistory",
  TransactionHistory,
);
