import { Router } from "express";
import { CreateCategory, GetAllCategories } from "../controllers/category";

const Category = Router();

Category.post("/", CreateCategory);

Category.get("/", GetAllCategories);

export default Category;
