import { Schema, model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as moment from "moment";
import * as mongoosePagination from "mongoose-paginate";
import Driver from "../Types/driver";
import Constants from "../constants/index";

const GuarrantorInformation = new Schema({
  fullName: { type: Schema.Types.String, reqired: true },
  phoneNumber: { type: Schema.Types.String, required: true },
  address: { type: Schema.Types.String, required: true },
  ID: { type: Schema.Types.String, required: true },
  IDType: {
    type: Schema.Types.String,
    required: true,
    enum: ["nin", "drl", "vc"],
  },
  placeOfWork: { type: Schema.Types.String },
  positionAtWork: { type: Schema.Types.String },
  addressOfPlaceOfWork: { type: Schema.Types.String },
  email: { type: Schema.Types.String },
});

const Drivers: Schema = new Schema({
  userId: Schema.Types.String,
  hash: Schema.Types.String,
  localPhoneNumber: { type: Schema.Types.String },
  phoneNumber: {
    type: Schema.Types.String,
  },
  accountDisabled: { type: Schema.Types.Boolean, default: false },
  driverLicense: { type: Schema.Types.String },
  taxiLicense: { type: Schema.Types.String },
  isAvailable: { type: Schema.Types.Boolean, default: true },
  isActivated: { type: Schema.Types.Boolean, default: true },
  isPicker: { type: Schema.Types.Boolean, default: true },
  applicationDeclined: { type: Schema.Types.Boolean, default: false },
  firstName: Schema.Types.String,
  lastName: Schema.Types.String,
  gender: { type: Schema.Types.String, enum: ["male", "female"] },
  accountType: {
    type: Schema.Types.String,
    default: "driver",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  salt: Schema.Types.String,
  loginAttempts: { type: Schema.Types.Number, default: 0 },
  attemptsDuration: { type: Schema.Types.Date },
  tillUnlocked: { type: Schema.Types.Date },
  guarrantorInformation: { type: GuarrantorInformation },
  photo: { type: Schema.Types.String, required: true },
  driverLicensePhoto: { type: Schema.Types.String, required: true },
});

Drivers.index({
  phoneNumber: "text",
  firstName: "text",
  lastName: "text",
  localPhoneNumber: "text",
});

Drivers.methods.setPassword = function setPassword(password) {
  const documents = this as Driver;
  documents.salt = bcrypt.genSaltSync(10);
  documents.hash = bcrypt.hashSync(password, documents.salt);
};

Drivers.methods.isAccountLocked = function isAccountLocked() {
  const documents = this as Driver;

  if (documents.tillUnlocked) {
    const now = new Date();
    if (documents.tillUnlocked > now) {
      return true;
    }
    return false;
  }
  return false;
};

Drivers.methods.lockAccount = async function lockAccount() {
  const documents = this as Driver;

  const now = new Date();
  if (documents.attemptsDuration > now) {
    documents.loginAttempts += 1;
    if (documents.loginAttempts >= Constants.Timers.LOGIN_ATTEMPTS) {
      documents.tillUnlocked = moment(new Date()).add(
        Constants.Timers.UNITLL_UNBLOCK_DURATION,
        "minutes",
      );
    }
  } else {
    documents.attemptsDuration = moment(new Date()).add(
      Constants.Timers.DURATION_TO_FAIL_ATTEMPTS,
      "minutes",
    );
    documents.loginAttempts = 1;
  }

  await documents.save();
};

Drivers.methods.validatePassword = function validatePassword(
  password,
) {
  const documents = this as Driver;
  const hash = bcrypt.compareSync(password, documents.hash);
  return hash;
};

Drivers.plugin(mongoosePagination);

export default model<Driver>("Drivers", Drivers);
