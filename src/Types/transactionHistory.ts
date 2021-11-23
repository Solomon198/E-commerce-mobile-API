import { Document } from "mongoose";

export interface TransactionHistoryTypes extends Document {
  amount: number;
  parcel: any[];
  date: Date;
  status: "success" | "failed";
  message: string;
  driver: string;
  user: string;
  paidAt: Date;
  reference?: string;
  userId: string;
}
