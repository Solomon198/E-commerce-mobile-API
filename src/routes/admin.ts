import { Router } from "express";
import DashboardAnalytics from "../admin.controllers/dashboard.analytics";
import fetchDrivers, {
  searchDrivers,
  enableAccount,
  disableAccount,
  CreateDriver,
  updateDriverInformation,
} from "../admin.controllers/dansako.drivers";
import fetchUsers, {
  searchUsers,
  enableAccount as enableUserAccount,
  disableAccount as disableUserAccount,
  addUserAsAdmin,
  removeUserFromAdmin,
  CreateUser,
  updateUserInformation,
  CreateAdminUser,
} from "../admin.controllers/dansako.users";
import {
  FetchTrips,
  FetchDriverAnalytics,
  FetchUserAnalytics,
  FetchAllTrips,
  FetchAllAdminAccount,
} from "../admin.controllers/admin.platform.resources";
import fetchVariables, {
  setVariables,
} from "../admin.controllers/dansako.env.config";
import fetchApplications, {
  AcceptApplication,
  DeclineApplication,
} from "../admin.controllers/dansako.applications";
import loginAdmin from "../admin.controllers/admin.login";
import constants from "../constants/index";
import ValidatePaginated from "../Validators/get.paginated.validator";
import ValidateDeclineApplication from "../Validators/decline.application";
import ValidateAcceptApplication from "../Validators/accept.application";
import ValidateSearch from "../Validators/validate.search";
import ValidateSetVariables from "../Validators/validate.set.env";
import LoginValidator from "../Validators/login.user.validator";
import HandleUnverifiedAccount from "../Middlewares/login";
import ValidateUserIdParam from "../Validators/validate.account.disable.enable";
import ValidateGetDeliveries from "../Validators/validate.get.deliveries";
import ValidateDriverSignup from "../Validators/signup.driver.validator";
import ValidateUpdateDriverInformation from "../Validators/admin.update.driver";
import HandleDuplicateSignUpMiddleWare from "../Middlewares/signUp";
import ValidateSignUpMiddleWare from "../Validators/signup.user.validator";
import ValidateUpdateUser from "../Validators/admin.update.user";
import ValidateGetTrips from "../Validators/validate.get.trips";

const {
  ADMIN_LOGIN,
  ANALYTICS,
  GET_DRIVERS,
  GET_USERS,
  GET_VARIABLES,
  APPLICATION,
  ACCEPT_APPLICATION,
  DECLINE_APPLICATION,
  SEARCH_DRIVERS,
  SEARCH_USERS,
  SET_VARIABLES,
  ENABLE_DRIVER,
  ENABLE_USER,
  DISABLE_DRIVER,
  DISABLE_USER,
  DRIVER_ANALYTICS,
  USER_ANALYTICS,
  GET_DELIVERIES,
  ADD_ADMIN,
  REMOVE_ADMIN,
  UPDATE_DRIVER,
  ADD_DRIVER,
  UPDATE_USER,
  ADD_USER,
  DELIVERIES,
  ADMIN,
  CREATE_ADMIN,
} = constants.RoutesSubs;

const Admin = Router();

Admin.post(
  ADMIN_LOGIN,
  LoginValidator,
  HandleUnverifiedAccount,
  loginAdmin,
);

// create driver
Admin.post(
  ADD_DRIVER,
  ValidateDriverSignup,
  HandleDuplicateSignUpMiddleWare,
  CreateDriver,
);
// update driver information
Admin.put(
  UPDATE_DRIVER,
  ValidateUpdateDriverInformation,
  updateDriverInformation,
);

// create admin user
Admin.post(
  CREATE_ADMIN,
  ValidateSignUpMiddleWare,
  HandleDuplicateSignUpMiddleWare,
  CreateAdminUser,
);

// create User
Admin.post(
  ADD_USER,
  ValidateSignUpMiddleWare,
  HandleDuplicateSignUpMiddleWare,
  CreateUser,
);
// update User information
Admin.put(UPDATE_USER, ValidateUpdateUser, updateUserInformation);

// enable Account
Admin.put(ENABLE_DRIVER, ValidateUserIdParam, enableAccount);
Admin.put(DISABLE_DRIVER, ValidateUserIdParam, disableAccount);

Admin.put(ENABLE_USER, ValidateUserIdParam, enableUserAccount);
Admin.put(DISABLE_USER, ValidateUserIdParam, disableUserAccount);

Admin.put(ADD_ADMIN, ValidateUserIdParam, addUserAsAdmin);
Admin.put(REMOVE_ADMIN, ValidateUserIdParam, removeUserFromAdmin);

Admin.get(
  DRIVER_ANALYTICS,
  ValidateUserIdParam,
  FetchDriverAnalytics,
);

Admin.get(USER_ANALYTICS, ValidateUserIdParam, FetchUserAnalytics);
Admin.get(GET_DELIVERIES, ValidateGetDeliveries, FetchTrips);

Admin.get(ANALYTICS, DashboardAnalytics);
Admin.get(GET_DRIVERS, ValidatePaginated, fetchDrivers);
Admin.get(GET_USERS, ValidatePaginated, fetchUsers);
Admin.get(GET_VARIABLES, fetchVariables);
Admin.get(APPLICATION, ValidatePaginated, fetchApplications);

Admin.get(SEARCH_DRIVERS, ValidateSearch, searchDrivers);
Admin.get(SEARCH_USERS, ValidateSearch, searchUsers);
Admin.get(DELIVERIES, ValidateGetTrips, FetchAllTrips);
Admin.get(ADMIN, FetchAllAdminAccount);

// update
Admin.put(
  ACCEPT_APPLICATION,
  ValidateAcceptApplication,
  AcceptApplication,
);
Admin.put(
  DECLINE_APPLICATION,
  ValidateDeclineApplication,
  DeclineApplication,
);
Admin.put(SET_VARIABLES, ValidateSetVariables, setVariables);

export default Admin;
