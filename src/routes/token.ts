import { Router } from "express";
import RefreshAccessToken from "../controllers/tokenManagement";
import constants from "../constants/index";
import ValidateRequestToken from "../Validators/token.request.validators";

const { TOKEN_MANAGEMENT } = constants.RoutesSubs;
const token = Router();

token.post(
  TOKEN_MANAGEMENT,
  ValidateRequestToken,
  RefreshAccessToken,
);

export default token;
