import { Router } from "express";
import SignUp from "../controllers/signUp";
import SignUpDriver from "../controllers/driver.signup";
import HandleDuplicateSignUpMiddleWare from "../Middlewares/signUp";
import ValidateSignUpInput from "../Validators/signup.user.validator";
import ValidateDriverSignUpInput from "../Validators/signup.driver.validator";
import constants from "../constants/index";

const { SIGNUP, DRIVER_SIGNUP } = constants.RoutesSubs;
const signUp = Router();

signUp.post(
  SIGNUP,
  ValidateSignUpInput,
  HandleDuplicateSignUpMiddleWare,
  SignUp,
);

signUp.post(
  DRIVER_SIGNUP,
  ValidateDriverSignUpInput,
  HandleDuplicateSignUpMiddleWare,
  SignUpDriver,
);

export default signUp;
