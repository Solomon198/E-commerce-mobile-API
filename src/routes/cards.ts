import { Router } from "express";
import ValidateAddCard from "../Validators/add.card.validator";
import ValidateGetCards from "../Validators/validate.get.cards";
import ValidateRemoveCard from "../Validators/remove.card.validator";
import ValidateCheckCard from "../Validators/validate.check.card";
import {
  AddCreditCard,
  GetCard,
  DeleteCard,
  cardExist,
} from "../controllers/card";
import constants from "../constants/index";

const { CARD, GET_CARDS, DELETE_CARD, CHECK_CARD } =
  constants.RoutesSubs;
const card = Router();

card.post(CARD, ValidateAddCard, AddCreditCard);
card.post(CHECK_CARD, ValidateCheckCard, cardExist);
card.get(GET_CARDS, ValidateGetCards, GetCard);

card.delete(DELETE_CARD, ValidateRemoveCard, DeleteCard);

export default card;
