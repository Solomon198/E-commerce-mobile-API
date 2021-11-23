import { Schema, model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as moment from "moment";
import * as mongoosePagination from "mongoose-paginate";
import User from "../Types/user";
import Constants from "../constants/index";

const Users: Schema = new Schema({
  userId: Schema.Types.String,
  localPhoneNumber: { type: Schema.Types.String },
  hash: Schema.Types.String,
  phoneNumber: {
    type: Schema.Types.String,
  },
  isLecturer: { type: Schema.Types.Boolean, default: false },
  isAdmin: { type: Schema.Types.Boolean, default: false },
  accountDisabled: { type: Schema.Types.Boolean, default: false },
  photo: { type: Schema.Types.String },
  isAvailable: { type: Schema.Types.Boolean, default: true },
  isPicker: { type: Schema.Types.Boolean, default: false },
  firtName: Schema.Types.String,
  lastName: Schema.Types.String,
  gender: { type: Schema.Types.String, enum: ["male", "female"] },
  accountType: {
    type: Schema.Types.String,
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  salt: Schema.Types.String,
  email: { type: Schema.Types.String, default: String },

  loginAttempts: { type: Schema.Types.Number, default: 0 },
  attemptsDuration: { type: Schema.Types.Date },
  tillUnlocked: { type: Schema.Types.Date },
});

Users.index({
  phoneNumber: "text",
  firtName: "text",
  lastName: "text",
  localPhoneNumber: "text",
});

Users.methods.setPassword = function setPassword(password) {
  const documents = this as User;
  documents.salt = bcrypt.genSaltSync(10);
  documents.hash = bcrypt.hashSync(password, documents.salt);
};

Users.methods.isAccountLocked = function isAccountLocked() {
  const documents = this as User;

  if (documents.tillUnlocked) {
    const now = new Date();
    if (documents.tillUnlocked > now) {
      return true;
    }
    return false;
  }
  return false;
};

Users.methods.lockAccount = async function lockAccount() {
  const documents = this as User;

  const now = new Date();
  if (documents.attemptsDuration > now) {
    documents.loginAttempts += 1;
    if (documents.loginAttempts >= Constants.Timers.LOGIN_ATTEMPTS) {
      documents.tillUnlocked = moment(new Date()).add(
        Constants.Timers.UNITLL_UNBLOCK_DURATION,
        "minutes"
      );
    }
  } else {
    documents.attemptsDuration = moment(new Date()).add(
      Constants.Timers.DURATION_TO_FAIL_ATTEMPTS,
      "minutes"
    );
    documents.loginAttempts = 1;
  }

  await documents.save();
};

Users.methods.validatePassword = function validatePassword(password) {
  const documents = this as User;
  const hash = bcrypt.compareSync(password, documents.hash);
  return hash;
};

Users.plugin(mongoosePagination);

export default model<User>("Users", Users);
