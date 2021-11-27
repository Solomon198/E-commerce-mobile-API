import { Document, Types } from "mongoose";

export type Parcel = {
  distance: number;
  parcelLocation: number[];
  parcelOwner: string;
  parcelPicker: string;
  date: string;
  parcelPrice: number;
  parcelStatus: number;
  parcelDestinationPhysicalAddress: string;
  parcelLocationPhysicalAddress: string;
  parcelDestination: number[];
  passengerPhoneNumber: string;
  userReject: boolean;
  driverReject: boolean;
  userAuthorization: string;
  transactionType: number;
};

export interface PostProps extends Document {
  coverImage: string;
  title: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  postId: Types.ObjectId;
  userId: string;
}
