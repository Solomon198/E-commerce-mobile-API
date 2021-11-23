import { Router } from "express";
// import * as useragent from 'useragent';
import HandleUnverifiedAccount from "../Middlewares/login";
import ValidateLoginMiddleWare from "../Validators/login.user.validator";
import loginAccount from "../controllers/login";
import loginDriver from "../controllers/login.driver";
// import PreventBruteAttack from '../Middlewares/brute-force';
import constants from "../constants/index";

const { LOGIN, LOGIN_DRIVER } = constants.RoutesSubs;
const login = Router();

login.post(
  LOGIN,
  ValidateLoginMiddleWare,
  HandleUnverifiedAccount,
  loginAccount,
);

login.post(
  LOGIN_DRIVER,
  ValidateLoginMiddleWare,
  HandleUnverifiedAccount,
  loginDriver,
);

export default login;
