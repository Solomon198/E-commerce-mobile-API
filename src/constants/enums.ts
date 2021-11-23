/* eslint-disable */
enum ParcelStatus {
  NOT_PICKED = 0,
  IN_PROGRESS = 1,
  PICKUP_DELIVERED = 2,
  DELIVERY_CONFIRMED = 3,
  PARCEL_DELIVERY_CANCELLED = 4,
}

export enum TransactionType {
  CASH = 0,
  CARD = 1,
}

export default ParcelStatus;
