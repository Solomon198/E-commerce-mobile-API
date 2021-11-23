import { Document, Types } from "mongoose";

type Guarrantor = {
  fullName: string;
  phoneNumber: string;
  address: string;
  ID: string;
  IDType: string;
  placeOfWork: string;
  postionAtWork: string;
  addressOfPlaceOfWork: string;
};

interface Driver extends Document {
  userId: Types.ObjectId;
  hash: string;
  localPhoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  accountType: string;
  isActivated: boolean;
  accountDisabled: boolean;
  applicationDeclined: boolean;
  phoneNumber: string;
  isVerified: boolean;
  token: string[];
  salt: string;
  loginAttempts: number;
  attemptsDuration: any;
  tillUnlocked: any;
  isAvailable: boolean;
  isPicker: boolean;
  photo: string;
  driverLicense: string;
  taxiLicesne: string;
  driverLicensePhoto: string;
  guarrantorInformation: Guarrantor;
  /* eslint-disable */
  setPassword: (pwd: string) => void;
  validatePassword: (pwd: string) => boolean;
  isAccountLocked: () => boolean;
  lockAccount: () => void;
  /* eslint-enable */
}

export default Driver;
