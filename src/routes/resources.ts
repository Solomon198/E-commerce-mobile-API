import { Router } from "express";
import constants from "../constants/index";
import GetBanks, {
  ConfirmAccountNumber,
  AddCheckoutAccount,
  GetDriversFinancialAccountDetails,
  DriverRequestWithDrawal,
} from "../controllers/resources";
import ValidateAddCheckoutAccount from "../Validators/validate.add.checkout.account";
import ValidateVerifyAccount from "../Validators/Validate.verify.account";
import ValidateWithdrawal from "../Validators/validate.driver.withdraw";
import ValidateGetAccountDetails from "../Validators/validate.get.financial.info";

const {
  BANKS,
  VERIFY_ACCOUNT,
  ADD_CHECKOUT_ACCOUNT,
  WALLET_INFO,
  REQUEST_WITHDRAWAL,
} = constants.RoutesSubs;
const resources = Router();

resources.get(BANKS, GetBanks);
resources.get(
  VERIFY_ACCOUNT,
  ValidateVerifyAccount,
  ConfirmAccountNumber,
);
resources.put(
  ADD_CHECKOUT_ACCOUNT,
  ValidateAddCheckoutAccount,
  AddCheckoutAccount,
);

resources.post(
  REQUEST_WITHDRAWAL,
  ValidateWithdrawal,
  DriverRequestWithDrawal,
);

resources.get(
  WALLET_INFO,
  ValidateGetAccountDetails,
  GetDriversFinancialAccountDetails,
);

export default resources;
