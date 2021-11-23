import { Schema, model } from "mongoose";
import DebtManagerType from "../Types/debt.manager";

const DebtManager: Schema = new Schema({
  driver: Schema.Types.ObjectId,
  user: Schema.Types.ObjectId,
  userId: Schema.Types.String,
  amount: Schema.Types.Number,
  parcel: [
    { type: Schema.Types.ObjectId, required: true, ref: "Parcel" },
  ],
});

export default model<DebtManagerType>("debtmanager", DebtManager);
