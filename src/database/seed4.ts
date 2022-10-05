import { getFriends, randomDate, dates, randomNumber, getPostSeedData } from "./seedHelpers";
import { Post } from "models";
import { GroupModel, UserModel, FriendshipModel } from "types";

type AddGroupsToUsersProps = { users: UserModel[]; hackerman: UserModel; groups: GroupModel[] };
export const addGroupsToUsers = ({ users, hackerman, groups }: AddGroupsToUsersProps) => {
    groups.forEach((group) => {
        group.members.forEach((member) => {
            if (member.user_id === hackerman._id) {
                hackerman.groups.push(group._id);
            } else {
                const index = users.findIndex((obj) => obj._id === member.user_id);
                users[index].groups.push(group._id);
            }
        });
    });
};

type SeedPostsProps = {
    users: UserModel[];
    friendships: FriendshipModel[];
    groups: GroupModel[];
};
export const seedPosts = async ({ users, friendships, groups }: SeedPostsProps) => {
    console.time("seedPosts");

    const props: any[] = [];
    users.forEach((user) => {
        const friends = getFriends({ userId: user._id, friendships });

        for (let i = 0; i < randomNumber(2, 4); i++) {
            const createdAt = randomDate(user.joined_at, dates.ten_days_ago);
            const postData = getPostSeedData({ authorId: user._id, createdAt, relevantUsers: friends });
            props.push(postData);
        }
    });

    groups.forEach((group) => {
        const members = group.members.map((obj) => obj.user_id);

        for (let i = 0; i < randomNumber(4, 6); i++) {
            const authorIndex = randomNumber(0, members.length - 1);
            const createdAt = randomDate(group.created_at, dates.ten_days_ago);
            const postData = getPostSeedData({
                authorId: members[authorIndex],
                createdAt,
                relevantUsers: members,
                groupId: group._id,
            });
            props.push(postData);
        }
    });

    const posts = await Post.insertMany(props).then((data) => JSON.parse(JSON.stringify(data)));

    console.timeEnd("seedPosts");
    return posts;
};
