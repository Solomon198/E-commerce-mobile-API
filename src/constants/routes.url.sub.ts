// ROUTES SUB URLS

// LOGIN
const LOGIN = "/";
const LOGIN_DRIVER = "/driver";

// SIGNUP
const SIGNUP = "/";
const DRIVER_SIGNUP = "/driver";

//  updates
const UPDATE_USER_PROFILE = "/user/profile";

// PARCEL
const PARCEL = "/";
const PARCEL_PICKED = "/picked-parcel";
const DELIVER_PARCEL = "/deliver-parcel";
const CONFIRM_PARCEL = "/confirm-parcel";
const REJECT_PARCEL = "/reject-parcel";
const GET_PARCELS = "/";

// TOKEN MANAGEMENT
const TOKEN_MANAGEMENT = "/refresh"; // manage tokens

// VERIFICATION
const VERIFICATION = "/";
const VERIFICATION_CALL = "/call"; // verification
const VERIFICATION_SMS = "/sms"; // verification
const VERIFICATION_CODE = "/code"; // verification

// RESET PASSWORD

const RESSET_PASSWORD = "/";

// CARD

const CARD = "/";
const GET_CARDS = "/:userId";
const DELETE_CARD = "/:authorization";
const CHECK_CARD = "/check";

// Analytics
const ANALYTICS = "/dashboard-analytics";

// drivers
const GET_DRIVERS = "/drivers";
const SEARCH_DRIVERS = "/drivers/search";

// Users
const GET_USERS = "/users";
const SEARCH_USERS = "/users/search";

// applications
const APPLICATION = "/application";
const DECLINE_APPLICATION = "/application/decline";
const ACCEPT_APPLICATION = "/application/accept";

// variables
const GET_VARIABLES = "/variables";
const SET_VARIABLES = "/variables/update";

// Admin sub routes
const ADMIN_LOGIN = "/login";
const DISABLE_DRIVER = "/disable/driver/:userId";
const DISABLE_USER = "/disable/user/:userId";
const ENABLE_USER = "/enable/user/:userId";
const ENABLE_DRIVER = "/enable/driver/:userId";
const DRIVER_ANALYTICS = "/analytics/driver/:userId";
const USER_ANALYTICS = "/analytics/user/:userId";
const GET_DELIVERIES = "/deliveries";
const ADD_ADMIN = "/add-admin/:userId";
const REMOVE_ADMIN = "/remove-admin/:userId";
const ADD_DRIVER = "/add-driver";
const UPDATE_DRIVER = "/update-driver";
const ADD_USER = "/add-user";
const UPDATE_USER = "/update-user";
const DELIVERIES = "/all-deliveries";
const ADMIN = "/";
const CREATE_ADMIN = "/create-admin";
const BANKS = "/banks";
const VERIFY_ACCOUNT = "/verify-bank-account";
const ADD_CHECKOUT_ACCOUNT = "/add-checkout-account";
const WALLET_INFO = "/financial-account-info";
const REQUEST_WITHDRAWAL = "/request-withdrawal";

export default {
  REQUEST_WITHDRAWAL,
  WALLET_INFO,
  ADD_CHECKOUT_ACCOUNT,
  VERIFY_ACCOUNT,
  BANKS,
  CREATE_ADMIN,
  ADMIN,
  DELIVERIES,
  ADD_USER,
  UPDATE_USER,
  ADD_DRIVER,
  UPDATE_DRIVER,
  ADD_ADMIN,
  REMOVE_ADMIN,
  DISABLE_DRIVER,
  DISABLE_USER,
  ENABLE_USER,
  ENABLE_DRIVER,
  DRIVER_ANALYTICS,
  USER_ANALYTICS,
  GET_DELIVERIES,
  ADMIN_LOGIN,
  GET_USERS,
  SEARCH_USERS,
  APPLICATION,
  DECLINE_APPLICATION,
  ACCEPT_APPLICATION,
  GET_VARIABLES,
  SET_VARIABLES,
  ANALYTICS,
  GET_DRIVERS,
  SEARCH_DRIVERS,
  GET_PARCELS,
  CHECK_CARD,
  GET_CARDS,
  DELETE_CARD,
  CARD,
  LOGIN_DRIVER,
  LOGIN,
  SIGNUP,
  TOKEN_MANAGEMENT,
  VERIFICATION,
  VERIFICATION_CALL,
  VERIFICATION_CODE,
  VERIFICATION_SMS,
  RESSET_PASSWORD,
  PARCEL,
  PARCEL_PICKED,
  DELIVER_PARCEL,
  CONFIRM_PARCEL,
  REJECT_PARCEL,
  DRIVER_SIGNUP,
  UPDATE_USER_PROFILE,
};
