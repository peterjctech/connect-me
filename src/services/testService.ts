import { Types } from "mongoose";
import { User } from "@models";
import { UserSummary, UserModel, UserData, Friend, MainThemes, ColorThemes, UserVisibility, PostData } from "@types";
import { getFullName, formatTimestamp, getTooltipList } from "@utils";

interface GetPostData {}

const getPostData = (post: GetPostData, self: { id: string }) => {
    const response: PostData = {};
};
