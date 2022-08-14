import { Post } from "@models";
import { PostModel, PostSummary, UserModel, PopulatedPostModel } from "@types";
import { Types } from "mongoose";
import { getUserSummary } from "./userServices";

export const getPostSummary = async (post: PopulatedPostModel, myId: Types.ObjectId) => {
    const response: PostSummary = {
        id: post._id,
        author: getUserSummary(),
    };
    return response;
};
