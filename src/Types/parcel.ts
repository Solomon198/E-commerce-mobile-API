import { Document } from "mongoose";

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

export interface ParcelModelTypes extends Document {
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
}
