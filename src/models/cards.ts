import { Schema, model } from "mongoose";
import Card from "../Types/card";

const Users: Schema = new Schema({
  userId: Schema.Types.String,
  cardNumber: Schema.Types.String,
  authorization: Schema.Types.String,
  email: Schema.Types.String,
  outStandingDiscount: { type: Schema.Types.Boolean, default: false },
});

export default model<Card>("cards", Users);
