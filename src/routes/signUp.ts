import { Router } from "express";
import SignUp from "../controllers/signUp";
import HandleDuplicateSignUpMiddleWare from "../Middlewares/signUp";
import ValidateSignUpInput from "../Validators/signup.user.validator";
import constants from "../constants/index";

const { SIGNUP } = constants.RoutesSubs;
const signUp = Router();

signUp.post(
  SIGNUP,
  ValidateSignUpInput,
  HandleDuplicateSignUpMiddleWare,
  SignUp
);

export default signUp;
