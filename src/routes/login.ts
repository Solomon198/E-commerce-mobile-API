import { Router } from "express";
// import * as useragent from 'useragent';
import HandleUnverifiedAccount from "../Middlewares/login";
import ValidateLoginMiddleWare from "../Validators/login.user.validator";
import loginAccount from "../controllers/login";
// import PreventBruteAttack from '../Middlewares/brute-force';
import constants from "../constants/index";

const { LOGIN } = constants.RoutesSubs;
const login = Router();

login.post(
  LOGIN,
  ValidateLoginMiddleWare,
  HandleUnverifiedAccount,
  loginAccount
);

export default login;
