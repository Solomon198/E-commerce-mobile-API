import { Request, Response } from "express";
import { ProcessingError, ProcessingSuccess } from "../RequestStatus/status";
import models from "../models/index";
import { CategoryProps } from "../Types/category";
import { Types } from "mongoose";

export async function CreateCategory(req: Request, res: Response) {
  try {
    const { name } = req.body as CategoryProps;
    const categoryId = new Types.ObjectId();
    const newCategory = new models.Category({
      name,
      categoryId,
    });
    newCategory._id = categoryId;
    await newCategory.save({ validateBeforeSave: false });
    const getCreatedCategory = await models.Category.findOne({ categoryId });
    return ProcessingSuccess(res, getCreatedCategory);
  } catch (e) {
    return ProcessingError(res);
  }
}

export async function GetAllCategories(
  req: Request, // eslint-disable-line
  res: Response
) {
  try {
    const categories = await models.Category.find({});
    return ProcessingSuccess(res, categories);
  } catch (e) {
    return ProcessingError(res);
  }
}
