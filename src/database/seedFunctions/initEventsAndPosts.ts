import { EventSchema, PostSchema } from "@models";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { IGroup, IUser } from "@types";
import { randomNumber, randomDate, dates, probability } from "../seedUtils";
import dayjs from "dayjs";
import { randomJoinRestriction, randomEventUserStatus, randomPrivacyOption } from "../randomEnum";
import { seedReactions, seedComments } from "../seedServices";

interface Props {
    groups: IGroup[];
    users: IUser[];
}

interface GetEventProps {
    userId: Types.ObjectId;
    groupId?: Types.ObjectId;
    users: Types.ObjectId[];
    createdAt: Date;
}
interface GetPostProps {
    author: Types.ObjectId;
    createdAt: Date;
    group?: Types.ObjectId;
    users: Types.ObjectId[];
}

const getEventSeed = ({ users, createdAt, groupId, userId }: GetEventProps) => {
    const starts_at = randomDate(dates.next_week, dates.future);
    let ends_at;
    if (probability(0.5)) {
        const start = dayjs(starts_at).unix();
        const ends = randomNumber(start, start + 30000);
        ends_at = dayjs.unix(ends).toDate();
    }
    const eventUsers = users
        .filter(() => probability(0.2))
        .map((id) => {
            return { user: id, status: randomEventUserStatus() };
        });

    let response: any = {
        creator: userId,
        name: faker.vehicle.vehicle(),
        description: faker.commerce.productDescription(),
        join_restriction: randomJoinRestriction(),
        users: eventUsers,
        reactions: seedReactions({ users, earliestDate: createdAt }),
        comments: seedComments({ users, earliestDate: createdAt }),
        created_at: createdAt,
        starts_at,
        privacy: randomPrivacyOption(),
    };
    if (groupId) response = { ...response, group: groupId };
    if (ends_at) response = { ...response, ends_at };
    return response;
};

const getPostSeed = ({ createdAt, author, group, users }: GetPostProps) => {
    let response: any = {
        author,
        content: faker.random.words(16),
        reactions: seedReactions({ users, earliestDate: createdAt }),
        comments: seedComments({ users, earliestDate: createdAt }),
        created_at: createdAt,
        is_edited: probability(0.1),
        privacy: randomPrivacyOption(),
    };

    if (group) response = { ...response, group };
    return response;
};

export default async function ({ groups, users }: Props) {
    const eventSeeds = [];
    const postSeeds = [];

    for (let i = 0; i < users.length; i++) {
        const relevantUsers = users[i].friends.map((obj) => obj.user);
        relevantUsers.unshift(users[i]._id);

        const eventCount = randomNumber(1, 2);
        for (let j = 0; j < eventCount; j++) {
            const createdAt = randomDate(users[i].joined_at, dates.last_week);
            const response = getEventSeed({ users: relevantUsers, createdAt, userId: users[i]._id });
            eventSeeds.push(response);
        }

        const postCount = randomNumber(3, 10);
        for (let j = 0; j < postCount; j++) {
            const createdAt = randomDate(users[i].joined_at, dates.last_week);
            const response = getPostSeed({ users: relevantUsers, createdAt, author: users[i]._id });
            postSeeds.push(response);
        }
    }

    for (let i = 0; i < groups.length; i++) {
        const relevantUsers: Types.ObjectId[] = [];
        const eventCreatorOptions: Types.ObjectId[] = [];
        const postAuthorOptions: Types.ObjectId[] = [];

        groups[i].users.forEach((user) => {
            if (user.status !== "Admin" && user.status !== "Member") return;
            relevantUsers.push(user.user);
            postAuthorOptions.push(user.user);
            if (user.status === "Member") return;
            eventCreatorOptions.push(user.user);
        });

        const eventCount = randomNumber(1, 4);
        for (let j = 0; j < eventCount; j++) {
            const createdAt = randomDate(groups[i].created_at, dates.yesterday);
            const response = getEventSeed({
                users: relevantUsers,
                createdAt,
                groupId: groups[i]._id,
                userId: faker.helpers.arrayElement(eventCreatorOptions),
            });
            eventSeeds.push(response);
        }

        const postCount = randomNumber(4, 8);
        for (let j = 0; j < postCount; j++) {
            const createdAt = randomDate(groups[i].created_at, dates.yesterday);
            const response = getPostSeed({
                users: relevantUsers,
                author: faker.helpers.arrayElement(postAuthorOptions),
                createdAt,
                group: groups[i]._id,
            });
            postSeeds.push(response);
        }
    }

    console.time("initEvents");
    const events = await EventSchema.insertMany(eventSeeds).then((data) => {
        return JSON.parse(JSON.stringify(data));
    });
    console.timeEnd("initEvents");

    console.time("initPosts");
    const posts = await PostSchema.insertMany(postSeeds).then((data) => {
        return JSON.parse(JSON.stringify(data));
    });
    console.timeEnd("initPosts");

    for (let i = 0; i < events.length; i++) {
        const eventUsers = events[i].users;
        for (let j = 0; j < eventUsers.length; j++) {
            const index = users.findIndex((obj) => obj._id === eventUsers[j].user);
            users[index].events.push({ event: events[i]._id, status: eventUsers[j].status });
        }

        if (events[i].group) {
            const index = groups.findIndex((obj) => obj._id === events[i].group);
            groups[index].events.push(events[i]._id);
        }
    }

    for (let i = 0; i < posts.length; i++) {
        const userIndex = users.findIndex((obj) => obj._id === posts[i].author);
        users[userIndex].posts.push(posts[i]._id);

        if (posts[i].group) {
            const groupIndex = groups.findIndex((obj) => obj._id === posts[i].group);
            groups[groupIndex].posts.push(posts[i]._id);
        }
    }

    return { posts, events };
}
