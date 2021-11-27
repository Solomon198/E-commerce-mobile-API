import { Schema, model } from "mongoose";
import * as mongoosePagination from "mongoose-paginate";
import { PostProps } from "../Types/post";

const Posts: Schema = new Schema({
  coverImage: Schema.Types.String,
  title: Schema.Types.String,
  description: Schema.Types.String,
  price: Schema.Types.Number,
  category: { type: Schema.Types.ObjectId, ref: "category" },
  postId: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
});

Posts.plugin(mongoosePagination);

export default model<PostProps>("Post", Posts as any);
