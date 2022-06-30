import { Resolvers } from "@apollo/client";
import { UserModel } from "@models";
import { createUserProps } from "@services";

const userResolvers: Resolvers = {
    Query: {
        async getAllUsers() {
            return;
        },
    },
    Mutation: {
        async createUser(_, args) {
            const props = await createUserProps(args);
            if (props.errors) throw new Error(props.errors[0]);
            await UserModel.create(props);
            return { message: `Successfully created user ${props.username}` };
        },
    },
};

export default userResolvers;
