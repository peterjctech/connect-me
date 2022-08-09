import { Group, User } from "@models";
import { UserModel } from "@types";
import { formatTimestamp, parsePost } from "@utils";

interface Member {
    _id: UserModel;
    is_admin: boolean;
    join_date: number;
}

export const parseGroupData = async (id: string) => {
    const group = await Group.findById(id)
        .populate("founder")
        .populate("members._id")
        .populate("tags")
        .populate("events")
        .populate("posts");

    const posts = [];

    for (let i = 0; i < group.posts.length; i++) {
        const obj = group.posts[i];
        const author = await User.findById(obj.author);
        posts.push(parsePost(obj, author));
    }

    const response = {
        _id: group._id,
        name: group.name,
        founder_id: group.founder._id,
        founder: `${group.founder.first_name} ${group.founder.last_name}`,
        description: group.description,
        group_image: group.group_image,
        visibility: group.visibility,
        admins: group.members
            .filter((obj: Member) => obj.is_admin)
            .map((obj: Member) => {
                const member = obj._id;

                return {
                    _id: member._id,
                    profile_picture: member.profile_picture,
                    full_name: `${member.first_name} ${member.last_name}`,
                };
            }),
        members: group.members
            .filter((obj: Member) => !obj.is_admin)
            .map((obj: Member) => {
                const member = obj._id;

                return {
                    _id: member._id,
                    profile_picture: member.profile_picture,
                    full_name: `${member.first_name} ${member.last_name}`,
                };
            }),
        tags: group.tags,
        events: group.events,
        posts,
        created_at: formatTimestamp(group.created_at, "date"),
    };

    return response;
};
