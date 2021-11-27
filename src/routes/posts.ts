import { Router } from "express";
import ValidateParcelMiddleware from "../Validators/create.parcel.validator";
import { CreatePost, fetchUserPosts, fetchFeeds } from "../controllers/post";
import constants from "../constants/index";
import ValidateGetparcels from "../Validators/validate.get.post";

const { PARCEL, GET_PARCELS } = constants.RoutesSubs;
const Post = Router();

Post.post(PARCEL, ValidateParcelMiddleware, CreatePost);

Post.get("/feeds", fetchFeeds);

Post.get(GET_PARCELS, ValidateGetparcels, fetchUserPosts);

export default Post;
