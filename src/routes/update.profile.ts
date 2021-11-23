import { Router } from "express";
// import * as useragent from 'useragent';
import ValidateUpdateProfile from "../Validators/update.user.profile";
import UpdateUserInfo from "../controllers/update.profile";
// import PreventBruteAttack from '../Middlewares/brute-force';
import constants from "../constants/index";

const { UPDATE_USER_PROFILE } = constants.RoutesSubs;
const UpdateProfile = Router();

UpdateProfile.put(
  UPDATE_USER_PROFILE,
  ValidateUpdateProfile,
  UpdateUserInfo,
);

export default UpdateProfile;
