import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as cors from 'cors';
import routes from './routes';
import constants from './constants/index';

/* eslint-disable*/
require('dotenv/config');
require('./utills/connection');
const certJSON = require('../serviceAccountKey.json');

/* eslint-enable */
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(certJSON),
});
const {
  LOGIN_BASE,
  SIGNUP_BASE,
  VERIFICATION_BASE,
  TOKEN_MANAGEMENT_BASE,
  RESSET_PASSWORD_BASE,
  PARCEL,
  UPDATE,
  CARD,
  ADMIN,
  RESOURCES,
} = constants.RouteBase;
// Application-Level Middleware
const app = express();
// app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
// api doc directory
app.use('/', express.static('api-doc'));

// Routes
app.use(ADMIN, routes.Admin);
app.use(LOGIN_BASE, routes.login);
app.use(SIGNUP_BASE, routes.SignUp);
app.use(VERIFICATION_BASE, routes.Verification);
app.use(TOKEN_MANAGEMENT_BASE, routes.Token);
app.use(RESSET_PASSWORD_BASE, routes.PasswordReset);
app.use(PARCEL, routes.Parcel);
app.use(UPDATE, routes.UpdateProfile);
app.use(CARD, routes.card);
app.use(RESOURCES, routes.Resources);

exports.app = functions.https.onRequest(app);
export default app;
