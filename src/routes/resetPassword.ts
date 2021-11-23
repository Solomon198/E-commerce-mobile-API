import { Router } from "express";
import RessetPassword from "../controllers/passwordResset";
import constants from "../constants/index";
import ValidatePasswordResset from "../Validators/resset.password.validator";

const { RESSET_PASSWORD } = constants.RoutesSubs;
const PasswordReset = Router();

PasswordReset.post(
  RESSET_PASSWORD,
  ValidatePasswordResset,
  RessetPassword,
);

export default PasswordReset;
