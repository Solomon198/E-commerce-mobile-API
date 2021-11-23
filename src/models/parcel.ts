import { Schema, model } from "mongoose";
import * as mongoosePagination from "mongoose-paginate";
import ParcelStatus, { TransactionType } from "../constants/enums";
import { ParcelModelTypes } from "../Types/parcel";

const Parcel: Schema = new Schema({
  distance: Schema.Types.Number,
  parcelLocation: [Schema.Types.Number],
  parcelOwner: { type: Schema.Types.ObjectId, ref: "Users" },
  parcelPicker: { type: Schema.Types.ObjectId, ref: "Drivers" },
  date: { type: Schema.Types.Date, default: new Date() },
  parcelPrice: Schema.Types.Number,
  parcelStatus: {
    enum: [
      ParcelStatus.DELIVERY_CONFIRMED,
      ParcelStatus.PARCEL_DELIVERY_CANCELLED,
    ],
    type: Schema.Types.Number,
  },
  parcelDestinationPhysicalAddress: Schema.Types.String,
  parcelLocationPhysicalAddress: Schema.Types.String,
  parcelDestination: [Schema.Types.Number],
  parcelOwnerPhoneNumber: [Schema.Types.String],
  userReject: { type: Schema.Types.Boolean, default: false },
  driverReject: { type: Schema.Types.Boolean, default: false },
  userAuthorization: { type: Schema.Types.String },
  transactionType: {
    required: true,
    type: Schema.Types.Number,
    enum: [TransactionType.CARD, TransactionType.CASH],
  },
});

Parcel.plugin(mongoosePagination);

export default model<ParcelModelTypes>("Parcel", Parcel as any);
