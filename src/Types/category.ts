import { Document, Types } from "mongoose";

export interface CategoryProps extends Document {
  name: string;
  categoryId: Types.ObjectId;
}

export default CategoryProps;
