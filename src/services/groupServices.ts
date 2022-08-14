import { GroupModel, GroupStatus, GroupSummary, UserModel } from "@types";
import { getMutualCount } from "@utils";

export const getGroupSummary = (group: GroupModel, me: UserModel | null) => {
    let myStatus: GroupStatus | "None" = "None";
    const allMembers = [...group.admins, ...group.members];

    if (me) {
        const myGroupObj = me.groups.find((obj) => obj.group_id === group._id);
        if (!myGroupObj) throw new Error("An unexpected error has occurred");
        myStatus = myGroupObj.status;
    }

    const response: GroupSummary = {
        id: group._id,
        group: group.group,
        description: group.description,
        group_image: group.group_image,
        my_status: myStatus,
        is_joined: myStatus === "None" ? false : true,
        join_restriction: group.join_restriction,
        user_count: allMembers.length,
        friends_in_group_count: getMutualCount(allMembers, me ? me.friends.map((obj) => obj.user_id) : null),
    };
    return response;
};
