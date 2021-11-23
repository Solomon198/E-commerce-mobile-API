import { Document, Types } from "mongoose";

type coordinates = {
  coordinates: number[];
};
interface User extends Document {
  userId: Types.ObjectId;
  hash: string;
  isLecturer: boolean;
  firstName: string;
  firtName: string;
  lastName: string;
  localPhoneNumber: string;
  gender: string;
  accountType: string;
  isAdmin: boolean;
  accountDisabled: boolean;
  phoneNumber: string;
  photo: string;
  isVerified: boolean;
  salt: string;
  email: string;
  loginAttempts: number;
  attemptsDuration: any;
  tillUnlocked: any;
  isAvailable: boolean;
  token: string[];
  isPicker: boolean;
  location: coordinates;
  /* eslint-disable */
  setPassword: (pwd: string) => void;
  validatePassword: (pwd: string) => boolean;
  isAccountLocked: () => boolean;
  lockAccount: () => void;
  /* eslint-enable */
}

export default User;
