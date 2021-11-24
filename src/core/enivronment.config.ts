require("dotenv/config");

const {
  JWT_SIGN,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  SINCH_KEY,
  SINCH_SECRET,
  NUMVERIFY_SECRET,
  GEOCODING_APIKEY,
  PAYSTACK_SECRET_TEST,
  PAYSTACK_SECRET_LIVE,
  PORT,
  JWT_AUDIENCE,
  JWT_ISSUER,
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_MESSAGING_SID,
  TWILIO_PHONE_NUMBER,
} = process.env;

const developement = {
  JWT_SIGN: "my-secret", // secret for decoding jwts token
  SINCH_KEY, // sinch key ==> you can get this by signing up with sinch and a free $2
  SINCH_SECRET, // sinch secret
  NUMVERIFY_SECRET, // you can get this by signing up to numverify
  GEOCODING_APIKEY, // you can get this by from google cloud
  PAYSTACK_SECRET: PAYSTACK_SECRET_TEST, // signup to paystack !!
  PORT: 8070,
  DB_CONNECTION_STRING: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@jobworld.bb7uz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  JWT_ISSUER: "https://example.com/example",
  JWT_AUDIENCE: "76rghjklkjh",
  JWT_ALGO: "RS256",
  APP_TEST_ENDPOINT: "http://localhost:8070",
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_MESSAGING_SID,
  TWILIO_PHONE_NUMBER,
};

const production = {
  JWT_SIGN,
  SINCH_KEY,
  SINCH_SECRET,
  NUMVERIFY_SECRET,
  GEOCODING_APIKEY,
  PAYSTACK_SECRET: PAYSTACK_SECRET_LIVE,
  DB_CONNECTION_STRING: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@jobworld.bb7uz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  JWT_ISSUER: JWT_AUDIENCE,
  JWT_AUDIENCE: JWT_ISSUER,
  PORT,
  JWT_ALGO: "RS256",
  APP_TEST_ENDPOINT: "",
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_MESSAGING_SID,
  TWILIO_PHONE_NUMBER,
};

export default function environment() {
  switch (process.env.NODE_ENV) {
    case "dev":
      return developement;
    case "production":
      return production;
    default:
      return production;
  }
}
