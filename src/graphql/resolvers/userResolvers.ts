import { UserModel } from "@models";
import { Resolvers } from "@apollo/client";

const userResolvers: Resolvers = {
    Query: {
        async getAllUsers() {
            console.log("running in resolvers");
            const users = await UserModel.find();
            return users;
        },
        async getUser(_, args) {
            const user = await UserModel.findOne({ _id: args.id });
            return user;
        },
        async me() {
            console.log("me");
        },
        async loginUser() {
            console.log("loginUser");
        },
    },
    // Mutation: {
    //     async createUser(_, args) {
    //         console.log("createUser => ", args);
    //     },
    //     async deleteUser(_, args) {
    //         console.log("deleteUser => ", args);
    //     },
    // },
};

export default userResolvers;
