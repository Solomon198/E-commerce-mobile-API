import { Document } from "mongoose";

interface DebtManagerType extends Document {
  driver: string;
  user: string;
  amount: number;
  parcel: any[];
  userId: string;
}

export default DebtManagerType;
