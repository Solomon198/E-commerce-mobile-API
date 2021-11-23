import { Router } from "express";
import ValidateParcelMiddleware from "../Validators/create.parcel.validator";
import {
  CreateParcel,
  ParcelDelivered,
  ParcelPicked,
  ConfirmDelivery,
  ParcelDeliveryCancelled,
  fetchUserParcels,
  fetchDriverParcels,
} from "../controllers/parcel";
import constants from "../constants/index";
import DeliveredAndAcceptParcelValidator from "../Validators/acceptAndDeliver.parcel.validators";
import ValidateConfirmParcelDelivery from "../Validators/confirm.parcel.validator";
import ValidateGetparcels from "../Validators/validate.get.parcels";
import RejectParcelDelivery from "../Validators/reject.parcel.validator";
import CheckUserDebt from "../Middlewares/client.debt";

const {
  PARCEL,
  PARCEL_PICKED,
  DELIVER_PARCEL,
  CONFIRM_PARCEL,
  REJECT_PARCEL,
  GET_PARCELS,
} = constants.RoutesSubs;
const Parcel = Router();

Parcel.post(
  PARCEL,
  ValidateParcelMiddleware,
  CheckUserDebt,
  CreateParcel,
);

Parcel.get(GET_PARCELS, ValidateGetparcels, fetchUserParcels);
Parcel.get(
  `${GET_PARCELS}driver`,
  ValidateGetparcels,
  fetchDriverParcels,
);

Parcel.put(
  PARCEL_PICKED,
  DeliveredAndAcceptParcelValidator,
  ParcelPicked,
);
Parcel.put(
  DELIVER_PARCEL,
  DeliveredAndAcceptParcelValidator,
  ParcelDelivered,
);
Parcel.put(
  CONFIRM_PARCEL,
  ValidateConfirmParcelDelivery,
  ConfirmDelivery,
);

Parcel.put(
  REJECT_PARCEL,
  RejectParcelDelivery,
  ParcelDeliveryCancelled,
);

export default Parcel;
