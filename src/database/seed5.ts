import { randomDate, dates, randomNumber, getEventSeedData } from "./seedHelpers";
import { Event } from "models";
import { GroupModel, UserModel } from "types";

type SeedEventsProps = {
    users: UserModel[];
    groups: GroupModel[];
};
export const seedEvents = async ({ users, groups }: SeedEventsProps) => {
    console.time("seedEvents");

    const props: any[] = [];
    users.forEach((user) => {
        const friends = user.friends.filter((obj) => obj.status === "Accepted").map((obj) => obj.user_id);

        for (let i = 0; i < randomNumber(0, 1); i++) {
            const createdAt = randomDate(user.joined_at, dates.ten_days_ago);
            const eventData = getEventSeedData({
                creator: user._id,
                refID: user._id,
                refModel: "User",
                relevantUsers: friends,
                createdAt,
            });
            props.push(eventData);
        }
    });

    groups.forEach((group) => {
        const members = group.members.map((obj) => obj.user_id);

        for (let i = 0; i < randomNumber(2, 4); i++) {
            const creatorIndex = randomNumber(0, members.length - 1);
            const createdAt = randomDate(group.created_at, dates.ten_days_ago);
            const eventData = getEventSeedData({
                creator: members[creatorIndex],
                refID: group._id,
                refModel: "Group",
                relevantUsers: members,
                createdAt,
            });
            props.push(eventData);
        }
    });

    const events = await Event.insertMany(props).then((data) => JSON.parse(JSON.stringify(data)));

    console.timeEnd("seedEvents");
    return events;
};
