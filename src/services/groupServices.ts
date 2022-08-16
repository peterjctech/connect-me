import { GroupModel, GroupStatus, GroupSummary, UserModel } from "@types";
import { getMutualCount } from "@utils";

export const getGroupSummary = (group: GroupModel, me: UserModel | null) => {
    let myStatus: GroupStatus | "None" = "None";
    const members = group.users.filter(
        (obj) => obj.status === "Founder" || obj.status === "Admin" || obj.status === "Member"
    );

    const response: GroupSummary = {
        id: group._id,
        name: group.name,
        description: group.description,
        group_image: group.group_image,
        my_status: myStatus,
        is_joined: me && members.find((obj) => obj.user === me._id) ? true : false,
        join_restriction: group.join_restriction,
        user_count: members.length,
        friends_in_group_count: getMutualCount(
            members.map((obj) => obj.user),
            me ? me.friends.map((obj) => obj.user) : null
        ),
    };
    return response;
};
