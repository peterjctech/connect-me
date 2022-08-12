import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { ConversationModel, EventModel, GroupModel, GroupStatus, InterestModel, PostModel, UserModel } from "@types";
import { Types } from "mongoose";
import {
    getId,
    selectRandomColor,
    selectRandomPreference,
    getRandomTimestamp,
    cutArray,
    selectRandomJoinRestriction,
    selectRandomEventStatus,
    selectRandomReaction,
    selectRandomGroupStatus,
    createPost,
} from "./seedUtils";
import bcrypt from "bcrypt";
import { User, Conversation, Event, Group, Interest, Post } from "@models";

export const seedDatabase = async () => {
    const dates = {
        created: dayjs().year(2016).month(3).date(1).unix(),
        last_week: dayjs().subtract(1, "week").unix(),
        yesterday: dayjs().subtract(1, "day").unix(),
        recently: dayjs().subtract(3, "hour").unix(),
        now: dayjs().unix(),
        next_week: dayjs().add(1, "week").unix(),
        future: dayjs().add(4, "month").unix(),
    };

    const posts: PostModel[] = [];

    // Create 25 interests
    let interests: InterestModel[] = faker.helpers.uniqueArray(faker.random.word, 25).map((word) => {
        return {
            _id: getId(),
            interest: word,
            color: selectRandomColor(),
            user_list: [],
            group_list: [],
        };
    });

    // Create 100 users
    const users: UserModel[] = faker.helpers.uniqueArray(faker.internet.userName, 100).map((username) => {
        return {
            _id: getId(),
            username,
            password: faker.internet.password(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            profile_picture: faker.image.avatar(),
            join_timestamp: getRandomTimestamp(dates.created, dates.last_week),
            friends: [],
            groups: [],
            posts: [],
            interests: [],
            events: [],
            conversations: [],
            notifications: [],
            preferences: {
                theme: faker.helpers.arrayElement(["Light", "Dark"]),
                visibility: {
                    friends: selectRandomPreference(),
                    groups: selectRandomPreference(),
                    events: selectRandomPreference(),
                    interests: selectRandomPreference(),
                    posts: selectRandomPreference(),
                },
            },
        };
    });

    // Add friends
    users.forEach((user1, index1) => {
        users.forEach((user2, index2) => {
            if (0.2 > Math.random()) {
                const earliestDate =
                    user1.join_timestamp > user2.join_timestamp ? user1.join_timestamp : user2.join_timestamp;
                const friendshipDate = getRandomTimestamp(earliestDate, dates.now);

                users[index1].friends.push({
                    user_id: user2._id,
                    friendship_timestamp: friendshipDate,
                });

                users[index2].friends.push({
                    user_id: user1._id,
                    friendship_timestamp: friendshipDate,
                });
            }
        });
    });

    // Add interests to users, and users to interests
    users.forEach((user, index) => {
        const userInterests = cutArray({ array: interests, range: [0, 4] }).map((obj) => obj._id);

        interests.forEach((obj, i) => {
            if (userInterests.includes(obj._id)) {
                interests[i].user_list.push(user._id);
            }
        });

        users[index].interests = userInterests.map((id) => {
            return { interest_id: id, added_timestamp: getRandomTimestamp(users[index].join_timestamp, dates.now) };
        });
    });

    // Add 10 groups, populate with members, and add groups to users
    const groups: GroupModel[] = faker.helpers.uniqueArray(faker.music.songName, 10).map((name, index) => {
        const createdAt = getRandomTimestamp(users[index].join_timestamp, dates.last_week);
        const admins: Types.ObjectId[] = [users[index]._id];
        const members: Types.ObjectId[] = [];
        const join_requests: Types.ObjectId[] = [];
        const groupMembers = cutArray({ array: users, range: [1, 20], neglectedIndex: index }).map((obj) => obj._id);

        groupMembers.forEach((id) => {
            const random = Math.random();
            if (random < 0.2) {
                admins.push(id);
            } else if (random < 0.7) {
                members.push(id);
            } else {
                join_requests.push(id);
            }
        });

        const group: GroupModel = {
            _id: getId(),
            group: name,
            founder: users[index]._id,
            description: faker.commerce.productDescription(),
            group_image: "https://loremflickr.com/640/480/abstract",
            join_restriction: selectRandomJoinRestriction(),
            admins,
            members,
            join_requests,
            interests: cutArray({ array: interests, range: [1, 3] }).map((obj) => obj._id),
            events: [],
            posts: [],
            created_timestamp: createdAt,
            update_history: [
                {
                    user_id: users[index]._id,
                    update: `Group ${name} was created`,
                    timestamp: createdAt,
                },
            ],
        };

        users.forEach((obj, index) => {
            let status: GroupStatus | null = null;
            if (group.admins.includes(obj._id)) {
                status = "Admin";
            } else if (group.members.includes(obj._id)) {
                status = "Member";
            } else if (group.join_requests.includes(obj._id)) {
                status = "Pending";
            }

            if (status) {
                users[index].groups.push({
                    group_id: group._id,
                    join_timestamp: getRandomTimestamp(createdAt, dates.yesterday),
                    status,
                });
            }
        });

        interests.forEach((obj, index) => {
            if (group.interests.includes(obj._id)) {
                interests[index].group_list.push(group._id);
            }
        });

        return group;
    });

    // Add events to each group, and populate with comments, add the event to relevant users and groups
    const events: EventModel[] = [];

    for (let i = 0; i < groups.length; i++) {
        const numOfEvents = Math.floor(Math.random() * 4);

        for (let j = 0; j < numOfEvents; j++) {
            const allMembers = groups[i].admins.concat(groups[i].members);
            const createdAt = getRandomTimestamp(groups[i].created_timestamp, dates.yesterday);
            const startsAt = getRandomTimestamp(dates.next_week, dates.future);

            const event: EventModel = {
                _id: getId(),
                event: faker.vehicle.vehicle(),
                creator_id: groups[i].admins[Math.floor(Math.random() * groups[i].admins.length)],
                group_id: groups[i]._id,
                description: faker.commerce.department(),
                members: allMembers.map((id) => {
                    return {
                        user_id: id,
                        status: selectRandomEventStatus(),
                    };
                }),
                reactions: cutArray({ array: allMembers, range: [0] }).map((id) => {
                    return {
                        user_id: id,
                        reaction: selectRandomReaction(),
                        reaction_timestamp: getRandomTimestamp(createdAt, dates.now),
                    };
                }),
                comments: cutArray({ array: allMembers, range: [0] }).map((id) => {
                    return {
                        id: uuidv4(),
                        author_id: id,
                        content: faker.random.words(5),
                        likes: cutArray({ array: allMembers, range: [0, 10] }),
                        created_timestamp: getRandomTimestamp(createdAt, dates.now),
                        is_edited: 0.1 > Math.random() ? true : false,
                        replies: [],
                    };
                }),
                start_timestamp: startsAt,
                end_timestamp: 0.3 > Math.random() ? getRandomTimestamp(startsAt, startsAt + 30000) : undefined,
                created_timestamp: createdAt,
            };

            users.forEach((user, index) => {
                const status = event.members.find((obj) => obj.user_id === user._id)?.status;
                if (status) {
                    users[index].events.push({
                        event_id: event._id,
                        join_timestamp: getRandomTimestamp(createdAt, dates.now),
                        status,
                    });
                }
            });

            groups[i].events.push(event._id);
            events.push(event);
        }
    }

    // Create user posts
    users.forEach((user, index) => {
        const postCount = Math.floor(Math.random() * 4);

        for (let i = 0; i < postCount; i++) {
            const post = createPost({
                authorId: user._id,
                postCreationDate: getRandomTimestamp(user.join_timestamp, dates.yesterday),
                connectedUsers: user.friends.map((obj) => obj.user_id),
            });

            posts.push(post);
            users[index].posts.push(post._id);
        }
    });

    // Create group posts
    groups.forEach((group, index) => {
        const postCount = Math.floor(Math.random() * 8);
        const groupMembers = group.admins.concat(group.members);
        const authorIndex = Math.floor(Math.random() * groupMembers.length);

        for (let i = 0; i < postCount; i++) {
            const post = createPost({
                authorId: groupMembers[authorIndex],
                postCreationDate: getRandomTimestamp(group.created_timestamp, dates.yesterday),
                connectedUsers: groupMembers,
            });

            posts.push(post);
            groups[index].posts.push(post._id);
        }
    });

    // Create hackerman123 and admin

    const hackermanPassword = await bcrypt.hash("12345", 10);
    const adminPassword = await bcrypt.hash("admin", 10);
    const adminId = getId();

    const hackerman: UserModel = {
        _id: getId(),
        username: "hackerman123",
        password: hackermanPassword,
        first_name: "John",
        last_name: "Cena",
        profile_picture: "/default-profile-picture.jpg",
        join_timestamp: dates.last_week,
        friends: [
            {
                user_id: adminId,
                friendship_timestamp: dates.recently,
            },
        ],
        groups: [],
        posts: [],
        interests: [],
        events: [],
        conversations: [],
        notifications: [],
        preferences: {
            theme: "Dark",
            visibility: {
                friends: "Everyone",
                groups: "Everyone",
                events: "Everyone",
                interests: "Everyone",
                posts: "Everyone",
            },
        },
    };
    const admin: UserModel = {
        _id: adminId,
        username: "admin",
        password: adminPassword,
        first_name: "smiley",
        last_name: "face",
        profile_picture: "/default-profile-picture.jpg",
        join_timestamp: dates.yesterday,
        friends: [
            {
                user_id: hackerman._id,
                friendship_timestamp: dates.recently,
            },
        ],
        groups: [],
        posts: [],
        interests: [],
        events: [],
        conversations: [],
        notifications: [],
        preferences: {
            theme: "Light",
            visibility: {
                friends: "Nobody",
                groups: "Nobody",
                events: "Nobody",
                interests: "Nobody",
                posts: "Nobody",
            },
        },
    };

    // Give hackerman friends
    users.forEach((user, index) => {
        if (index % 2 === 0) {
            const earliestDate =
                hackerman.join_timestamp > user.join_timestamp ? hackerman.join_timestamp : user.join_timestamp;
            const friendshipDate = getRandomTimestamp(earliestDate, dates.now);

            users[index].friends.push({
                user_id: hackerman._id,
                friendship_timestamp: friendshipDate,
            });
            hackerman.friends.push({
                user_id: user._id,
                friendship_timestamp: friendshipDate,
            });
        }
    });

    // Give hackerman interests
    interests.forEach((interest, index) => {
        if (index % 6 === 0) {
            hackerman.interests.push({
                interest_id: interest._id,
                added_timestamp: getRandomTimestamp(hackerman.join_timestamp, dates.now),
            });
        }
    });

    // Give hackerman groups and events
    groups.forEach((group, gIndex) => {
        if (gIndex % 3 === 0) {
            const status = selectRandomGroupStatus();
            hackerman.groups.push({
                group_id: group._id,
                join_timestamp: getRandomTimestamp(hackerman.join_timestamp, dates.yesterday),
                status,
            });

            if (status === "Admin") {
                groups[gIndex].admins.push(hackerman._id);
            } else if (status === "Member") {
                groups[gIndex].members.push(hackerman._id);
            } else {
                groups[gIndex].join_requests.push(hackerman._id);
            }

            group.events.forEach((event, eIndex) => {
                hackerman.events.push({
                    event_id: event._id,
                    join_timestamp: getRandomTimestamp(dates.last_week, dates.yesterday),
                    status: "Maybe",
                });

                events[eIndex].members.push({
                    user_id: hackerman._id,
                    status: "Maybe",
                });
            });
        }
    });

    // Give hackerman posts
    for (let i = 0; i < 4; i++) {
        const post = createPost({
            authorId: hackerman._id,
            postCreationDate: getRandomTimestamp(hackerman.join_timestamp, dates.yesterday),
            connectedUsers: hackerman.friends.map((obj) => obj.user_id),
        });

        posts.push(post);
        hackerman.posts.push(post._id);
    }

    // Create conversation between hackerman and admin
    const convo: ConversationModel = {
        _id: getId(),
        title: "Conversation between hackerman123 and admin",
        members: [
            {
                user_id: hackerman._id,
                last_read_timestamp: dates.now,
            },
            {
                user_id: admin._id,
                last_read_timestamp: dates.now,
            },
        ],
        messages: [],
    };

    for (let i = 0; i < 30; i++) {
        convo.messages.push({
            user_id: i % 2 === 0 ? hackerman._id : admin._id,
            content: faker.random.words(5),
            timestamp: getRandomTimestamp(dates.recently, dates.now),
        });
    }

    users.push(hackerman);
    users.push(admin);

    try {
        await User.insertMany(users);
        console.log("Seeded Users");
        await Interest.insertMany(interests);
        console.log("Seeded Interests");
        await Event.insertMany(events);
        console.log("Seeded Events");
        await Post.insertMany(posts);
        console.log("Seeded Posts");
        await Group.insertMany(groups);
        console.log("Seeded Groups");
        await Conversation.create(convo);
        console.log("Seeded Conversation");
    } catch (error) {
        console.log("ERROR: Failed to seed database => ", error);
    }
};
