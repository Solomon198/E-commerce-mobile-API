import { Router } from "express";
import {
  verifyCode,
  SinchCall,
  SinchSMS,
} from "../controllers/verification";
import constants from "../constants/index";
import ValidateNumberVerification from "../Validators/verify.phone.validator";
// import PreventBruteAttack from '../Middlewares/brute-force';

const { VERIFICATION_CALL, VERIFICATION_CODE, VERIFICATION_SMS } =
  constants.RoutesSubs;
const Verification = Router();

Verification.post(
  VERIFICATION_CALL,
  ValidateNumberVerification,
  SinchCall,
);
Verification.post(
  VERIFICATION_SMS,
  ValidateNumberVerification,
  SinchSMS,
);
Verification.post(
  VERIFICATION_CODE,
  // PreventBruteAttack.prevent,
  verifyCode,
);

export default Verification;
