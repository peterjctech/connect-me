import { Resolvers } from "@apollo/client";
import { Group } from "@models";
import { parseGroupData } from "@services";
import { GroupProps } from "@types";

const groupResolvers: Resolvers = {
    Query: {
        async getGroup(_, args) {
            const data = await parseGroupData(args.id);
            return data;
        },
        async getAllGroups() {
            const groups = await Group.find({ $or: [{ visibility: "Open" }, { visibility: "Invite" }] });
            return { groups };
        },
    },
    Mutation: {
        async createGroup(_, args: GroupProps) {
            const group = await Group.create(args);
            return { message: `Successfully created group ${args.name}`, id: group._id };
        },
        async deleteGroup(_, args) {
            const group = await Group.findById(args.id);
            if (!group) throw new Error("Group doesn't exist!");
            await Group.deleteOne({ _id: group._id });
            return { message: `Successfully deleted group ${group.name}` };
        },
    },
};

export default groupResolvers;
