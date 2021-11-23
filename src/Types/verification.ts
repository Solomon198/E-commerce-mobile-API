import { Document } from "mongoose";

interface Verification extends Document {
  phoneNumber: string;
  token: string;
  date: any;
  pin: string;
  lastTimePinRequested: any;
  pinTrialDuration: any;
  pinTrials: number;
  isPinValid: (pin: string) => void; // eslint-disable-line
  selfDestruct: () => void; // eslint-disable
  incrementPinTrial: () => void;
}

export default Verification;
