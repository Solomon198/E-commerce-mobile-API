const LOCATIONS = "locations";
const isProduction = process.env.NODE_ENV === "production";
const USERS = "Users";
const DRIVERS = "drivers";
const PARCEL_HISTORIES = "Parcel-histories";
const APP_VARIABLES = "Variables";
const VARIABLES_SUBCOLLECTION = "app";
const ACTIVE_DELIVERIES = isProduction
  ? "Active-Deliveries"
  : "Test-Active-Deliveries";

export default {
  LOCATIONS,
  USERS,
  DRIVERS,
  PARCEL_HISTORIES,
  ACTIVE_DELIVERIES,
  APP_VARIABLES,
  VARIABLES_SUBCOLLECTION,
};
