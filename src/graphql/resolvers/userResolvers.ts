import { Resolvers } from "@apollo/client";
import { User } from "@models";
import { UserStoreData } from "@types";
import { getFullName } from "@utils";
import { deleteCookie } from "cookies-next";

const userResolvers: Resolvers = {
    Query: {
        initializeStore: async (_, __, context) => {
            if (!context.auth) return null;

            const user = await User.findById(context.auth);
            if (!user) {
                deleteCookie("server-key", { req: context.req, res: context.res });
                throw new Error("Logged in user does not exist!");
            }

            const response: UserStoreData = {
                user_id: user._id,
                full_name: getFullName(user),
                profile_picture: user.profile_picture,
                theme: user.preferences.theme,
                color: user.preferences.color,
            };
            return response;
        },
    },
};

export default userResolvers;
