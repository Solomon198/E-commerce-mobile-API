import * as bodyParser from "body-parser";
import * as express from "express";
// import * as functions from "firebase-functions";
import * as cors from "cors";
import routes from "./routes";
import constants from "./constants/index";

/* eslint-disable*/
require("dotenv/config");
require("./utills/connection");

const {
  LOGIN_BASE,
  SIGNUP_BASE,
  VERIFICATION_BASE,
  TOKEN_MANAGEMENT_BASE,
  RESSET_PASSWORD_BASE,
  POSTS,
  UPDATE,
  CATEGORIES,
} = constants.RouteBase;
// Application-Level Middleware
const app = express();
// app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
// api doc directory
app.use("/", express.static("api-doc"));

// Routes
app.use(LOGIN_BASE, routes.login);
app.use(SIGNUP_BASE, routes.SignUp);
app.use(VERIFICATION_BASE, routes.Verification);
app.use(TOKEN_MANAGEMENT_BASE, routes.Token);
app.use(RESSET_PASSWORD_BASE, routes.PasswordReset);
app.use(POSTS, routes.Posts);
app.use(UPDATE, routes.UpdateProfile);
app.use(CATEGORIES, routes.Categories);

export default app;
