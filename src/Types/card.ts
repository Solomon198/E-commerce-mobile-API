import { Document } from "mongoose";

export interface Card extends Document {
  userId: string;
  cardNumber: string;
  authorization: string;
  email: string;
  outStandingDiscount: boolean;
}

export default Card;
