import { faker } from "@faker-js/faker";
import { randomDate, dates, probability, getLastDate } from "../seedUtils";
import { randomGroupSettings } from "../randomEnum";
import { seedReactions } from "../seedServices";
import { IUser, GroupUserStatus } from "@types";
import { GroupSchema } from "@models";

interface Props {
    users: IUser[];
}

export default async function ({ users }: Props) {
    console.time("initGroups");
    const groupProps = faker.helpers.uniqueArray(faker.music.songName, 50).map((name, index) => {
        const createdAt = randomDate(users[index].joined_at, dates.last_week);
        return {
            founder: users[index]._id,
            name,
            description: faker.commerce.productDescription(),
            users: [{ user: users[index]._id, status: "Admin", joined_at: createdAt, is_member: true }],
            created_at: createdAt,
            update_history: [
                {
                    user: users[index]._id,
                    update_message: `Group ${name} was created`,
                    updated_at: createdAt,
                },
            ],
            settings: randomGroupSettings(),
        };
    });
    const groups = await GroupSchema.insertMany(groupProps).then((data) => {
        return JSON.parse(JSON.stringify(data));
    });

    for (let i = 0; i < groups.length; i++) {
        const index = users.findIndex((obj) => obj._id === groups[i].founder);
        users[index].groups.push({
            group: groups[i]._id,
            status: "Admin",
        });
    }

    for (let i = 0; i < groups.length; i++) {
        const possibleMembers = users.filter((obj) => obj._id !== groups[i].founder);
        const relevantUsers = possibleMembers.filter(() => probability(0.05));
        relevantUsers.forEach((user) => {
            let statusPossibilities: GroupUserStatus[] = ["Admin", "Member", "Banned"];
            if (groups[i].settings.join_restriction === "Invite") {
                statusPossibilities.push("Denied");
                statusPossibilities.push("Pending");
            }
            if (groups[i].settings.join_restriction === "Private") {
                statusPossibilities.push("Invited");
            }

            let joined_at;
            let is_member = false;
            const status: GroupUserStatus = faker.helpers.arrayElement(statusPossibilities);

            if (status === "Admin" || status === "Member") {
                const earliest = getLastDate([user.joined_at, groups[i].created_at]);
                joined_at = randomDate(earliest, dates.last_week);
                is_member = true;
            }
            groups[i].users.push({
                user: user._id,
                status,
                is_member,
                joined_at,
            });
            const index = users.findIndex((obj) => obj._id === user._id);
            users[index].groups.push({
                group: groups[i]._id,
                status,
            });
        });
    }

    for (let i = 0; i < groups.length; i++) {
        const userIds = groups[i].users
            .filter((obj: any) => obj.status === "Admin" && obj.status === "Member")
            .map((obj: any) => obj.user);
        groups[i].update_history[0].reactions = seedReactions({ users: userIds, earliestDate: groups[i].created_at });
    }

    console.timeEnd("initGroups");
    return groups;
}
