import { Schema, model } from "mongoose";
import Card from "../Types/category";

const Users: Schema = new Schema({
  name: Schema.Types.String,
  categoryId: Schema.Types.ObjectId,
});

export default model<Card>("category", Users);
