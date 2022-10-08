import { faker } from "@faker-js/faker";
import {
    dates,
    probability,
    randomDate,
    randomIndices,
    randomRelativeDate,
    randomStringArr,
    seedReactions,
} from "./seedHelpers";
import { Group } from "models";
import { UserModel } from "types";
import { groupRestrictionEnum, groupUserStatusEnum } from "utils";

export const seedGroups = async ({ users, hackerman }: { users: UserModel[]; hackerman: UserModel }) => {
    console.time("seedGroups");
    const groupCount = 50;
    const props = faker.helpers.uniqueArray(faker.music.songName, groupCount).map((name) => {
        const indices = randomIndices({ range: [10, 50], length: groupCount });
        const restriction = randomStringArr(groupRestrictionEnum);
        const createdAt = randomDate(users[indices[0]].joined_at, dates.two_months_ago);
        const allUsers = indices.map((num) => users[num]);
        if (probability(0.1)) {
            allUsers.unshift(hackerman);
        } else if (probability(0.4)) {
            allUsers.push(hackerman);
        }

        const members: any[] = [];
        const other_users: any[] = [];
        const user_activity: any[] = [];

        allUsers.forEach((user, index) => {
            if (index === 0) {
                members.push({ user_id: user._id, status: "Admin" });
                user_activity.push({ user_id: user._id, message: "created the group", date: createdAt });
            } else if (probability(0.8) || restriction === "Open") {
                const status = probability(0.8) ? "Member" : "Admin";
                const joined_at = randomDate(createdAt, dates.last_month);
                members.push({ user_id: user._id, status });
                user_activity.push({ user_id: user._id, message: "joined the group", date: joined_at });

                if (status === "Admin") {
                    user_activity.push({
                        user_id: user._id,
                        message: "was promoted to admin",
                        date: randomRelativeDate(joined_at, 10),
                    });
                }
            } else {
                const status = randomStringArr(groupUserStatusEnum);
                const message =
                    status === "Banned" ? "was banned" : "Invited" ? "was invited" : "requested an invitation";
                const user_date = randomDate(createdAt, dates.last_month);
                other_users.push({ user_id: user._id, status: randomStringArr(groupUserStatusEnum) });
                if (status === "Banned") {
                    user_activity.push({ user_id: user._id, message: "joined the group", date: user_date });
                    user_activity.push({ user_id: user._id, message, date: randomRelativeDate(user_date, 10) });
                } else {
                    user_activity.push({ user_id: user._id, message, date: user_date });
                }
            }
        });

        return {
            owner_id: allUsers[0]._id,
            name,
            description: faker.commerce.productDescription(),
            members,
            other_users,
            meta_activity: [
                {
                    updater_id: allUsers[0]._id,
                    change_message: "created the group",
                    date: createdAt,
                    reactions: seedReactions(members.map((obj) => obj.user_id)),
                },
            ],
            user_activity,
            created_at: createdAt,
            restriction,
        };
    });
    const groups = await Group.insertMany(props).then((data) => JSON.parse(JSON.stringify(data)));

    console.timeEnd("seedGroups");
    return groups;
};
