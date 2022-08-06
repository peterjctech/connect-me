import { Resolvers } from "@apollo/client";

const userResolvers: Resolvers = {
    Query: {
        async test() {
            return { message: "test successful!" };
        },
    },
};

export default userResolvers;
