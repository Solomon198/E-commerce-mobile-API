const INVALID_PASSWORD =
  "password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters";

const INVALID_CREDENTIALS =
  "Invalid Credentials please check your credentials  and retry";

const USER_SUSPENDED =
  "Account suspended due to incorrect login attempts please try again later.";

const MAX_PIN_TRIAL =
  "Maximum trial for pin exceeded, make sure you have the valid credential and request another pin";

const PIN_NOT_TIMED_OUT =
  "Mulitiple request detected to verify a single account please try after some time.";

const INCORRECT_PASSWORD = "Incorrect password please try again.";

const USER_EXIST =
  "Phone number already in use by another account please try another phone number.";

const SERVER_ERROR =
  "An unexpected error is preventing the server from processing the request please try again later.";

const UNAUTHORIZED =
  "Access denied please check your credentials and try again";

const UNVERIFIED_ACCOUNT =
  "This account is not verified, please verify account before attempting to use this account.";

const PARCEL_ALREADY_ACCEPTED = "Parcel already accepted";

const TOKEN_EXPIRE =
  "Token or verification pin expired, please verify your phone number again..";

const INCORRECT_VERIFICATION_PIN = "Incorrect Verification Pin.";

const DRIVER_TOKEN_SIGNUP_MESSAGE =
  "Token recieved after verification must be provided";

const USER_NOT_ACTIVATED =
  "User not activated please try again when you recieve a confirmation SMS notification";

const CANCEL_PICKED_PARCEL =
  " You can not cancel a parcel  delivery in progress ";

const CANNOT_REMOVE_CARD_PENDING_DISCOUNT =
  "Cannot remove card, you still have a #50 discount on this card";

const CANNOT_REMOVE_CARD_UNPAID_TRANSACTION =
  "Cannot remove card, you still have a pending transaction on the card";

const CANNOT_HAVE_TWO_BILLING_CARDS =
  "Cannot have two billing cards, please remove an existing card before adding another";

const CARD_ALREADY_IN_USE = "Card is already in use";

const DRIVER_CARD_CHARGES_REASON =
  "Card charged to verify card, and charge amount credited to user account on platform";

const USER_CARD_CHARGED_REASON =
  "Card charged to verify card, user cannot remove card except after first transaction so that discount worth of the charge will be given back to user which is normally subtracted from first trip price.";

const COULD_NOT_CHARGE_CARD =
  "Could not charge card please retry again and if it persist try again after 24 hours";

const UNABLE_TO_CHARGE_CARD_ACCESS_DENIAL =
  "Your account have been detected to have a pending amount that could not be charged, please fund you account to pay debt and try again";

export default {
  UNABLE_TO_CHARGE_CARD_ACCESS_DENIAL,
  COULD_NOT_CHARGE_CARD,
  DRIVER_CARD_CHARGES_REASON,
  USER_CARD_CHARGED_REASON,
  CARD_ALREADY_IN_USE,
  CANNOT_HAVE_TWO_BILLING_CARDS,
  CANNOT_REMOVE_CARD_UNPAID_TRANSACTION,
  CANNOT_REMOVE_CARD_PENDING_DISCOUNT,
  USER_NOT_ACTIVATED,
  DRIVER_TOKEN_SIGNUP_MESSAGE,
  INCORRECT_VERIFICATION_PIN,
  TOKEN_EXPIRE,
  INVALID_PASSWORD,
  INVALID_CREDENTIALS,
  USER_SUSPENDED,
  MAX_PIN_TRIAL,
  PIN_NOT_TIMED_OUT,
  INCORRECT_PASSWORD,
  USER_EXIST,
  SERVER_ERROR,
  UNAUTHORIZED,
  UNVERIFIED_ACCOUNT,
  PARCEL_ALREADY_ACCEPTED,
  CANCEL_PICKED_PARCEL,
};
