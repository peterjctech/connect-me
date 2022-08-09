import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { UserModel, GroupModel, CommentModel, PostModel, EventModel, TagModel, ChatModel } from "@types";
import { User, Group, Comment, Post, Event, Tag, Chat } from "@models";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

const getId = () => new Types.ObjectId();

const randomTimestamp = (ts1: number, ts2: number) => Math.floor(Math.random() * (ts2 - ts1) + ts1);

const cutArray = (array: any[], lowerLimit?: number | null, upperLimit?: number | null, neglectIndex?: number) => {
    const low = lowerLimit || 0;
    const high = !upperLimit || upperLimit > array.length ? array.length : upperLimit;
    const count = Math.floor(Math.random() * (high - low) + low);
    let newArray = array;
    if (neglectIndex) newArray = array.slice(neglectIndex, 1);
    return faker.helpers.uniqueArray(newArray, count);
};

interface CreatePost {
    author: Types.ObjectId;
    postCreationDate: number;
    connectedUsers: Types.ObjectId[];
    ref_id: Types.ObjectId;
    ref_model: string;
}

const createPost = (args: CreatePost) => {
    const comments: CommentModel[] = [];
    const recently = dayjs().subtract(3, "hour").unix();

    const postId = getId();
    const commenters = cutArray(args.connectedUsers, 0, 8);
    const postComments: Types.ObjectId[] = [];
    const reactions = cutArray(args.connectedUsers).map((obj) => {
        return {
            _id: obj,
            reaction: faker.helpers.arrayElement(["Like", "Love", "Sad", "Wow", "Angry"]),
        };
    });

    for (let i = 0; i < commenters.length; i++) {
        const commentCreated = randomTimestamp(args.postCreationDate, recently);
        const commentId = getId();
        const comment = {
            _id: commentId,
            author: commenters[i],
            content: faker.random.words(5),
            ref_id: postId,
            ref_model: "Post",
            likes: cutArray(args.connectedUsers),
            created_at: commentCreated,
            updated_at: 0.05 > Math.random() ? randomTimestamp(commentCreated, commentCreated + 2000) : undefined,
        };
        postComments.push(commentId);
        comments.push(comment);
    }

    const post = {
        _id: postId,
        author: args.author,
        content: faker.commerce.productDescription(),
        ref_id: args.ref_id,
        ref_model: args.ref_model,
        reactions,
        comments: postComments,
        created_at: args.postCreationDate,
        updated_at:
            0.05 > Math.random() ? randomTimestamp(args.postCreationDate, args.postCreationDate + 2000) : undefined,
    };

    return {
        post,
        postComments: comments,
    };
};

export const seedDatabase = async () => {
    const seedDates = {
        created: dayjs(new Date(2016, 3, 1)).unix(),
        last_week: dayjs().subtract(7, "day").unix(),
        yesterday: dayjs().subtract(1, "day").unix(),
        recently: dayjs().subtract(3, "hour").unix(),
        now: dayjs().unix(),
        nextWeek: dayjs().add(7, "day").unix(),
        future: dayjs().add(4, "month").unix(),
    };

    const comments: CommentModel[] = [];
    const posts: PostModel[] = [];

    // Create 25 tags
    const tags: TagModel[] = faker.helpers.uniqueArray(faker.random.word, 25).map((word) => {
        const newTag = {
            _id: getId(),
            title: word,
            color: faker.color.human(),
            user_list: [],
            group_list: [],
        };

        return newTag;
    });

    // Create 100 users
    const users: UserModel[] = faker.helpers.uniqueArray(faker.internet.userName, 100).map((username) => {
        const newUser = {
            _id: getId(),
            username: username,
            password: faker.internet.password(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            profile_picture: faker.image.avatar(),
            is_online: 0.4 > Math.random() ? true : false,
            join_timestamp: randomTimestamp(seedDates.created, seedDates.last_week),
            friends: [],
            messages: [],
            groups: [],
            posts: [],
            tags: [],
            events: [],
            notifications: [],
            chat_notifs: [],
        };

        return newUser;
    });

    // Add friends
    for (let i = 0; i < users.length; i++) {
        const joinDate = users[i].join_timestamp;
        for (let j = i + 1; j < users.length; j++) {
            if (0.2 > Math.random()) {
                const earliestDate = joinDate > users[j].join_timestamp ? joinDate : users[j].join_timestamp;
                const friendshipDate = randomTimestamp(earliestDate, seedDates.now);

                users[i].friends.push({
                    _id: users[j]._id,
                    timestamp: friendshipDate,
                });
                users[j].friends.push({
                    _id: users[i]._id,
                    timestamp: friendshipDate,
                });
            }
        }
    }

    // Add tags to users, and add users to tags
    for (let i = 0; i < users.length; i++) {
        const cutArr = cutArray(tags, 0, 4);
        const userTags = cutArr.map((obj) => obj._id);

        tags.forEach((tag, index) => {
            if (userTags.includes(tag._id)) {
                tags[index].user_list.push(users[i]._id);
            }
        });
        users[i].tags = userTags.map((tag) => tag._id);
    }

    // Add 10 groups, populate with members, add groups to users
    const groupNames = faker.helpers.uniqueArray(faker.music.songName, 10);
    const groups: GroupModel[] = [];
    for (let i = 0; i < groupNames.length; i++) {
        const groupId = getId();
        const createdAt = randomTimestamp(users[i].join_timestamp, seedDates.last_week);
        const groupTags = cutArray(tags, 1, 3).map((obj) => obj._id);
        const groupMembers = cutArray(users, 1, 20, i);
        const members = [
            {
                _id: users[i]._id,
                is_admin: true,
                join_date: createdAt,
            },
        ];
        groupMembers.forEach((user) => {
            members.push({
                _id: user._id,
                is_admin: 0.2 > Math.random() ? true : false,
                join_date: randomTimestamp(createdAt, seedDates.yesterday),
            });
        });
        const group = {
            _id: groupId,
            name: groupNames[i],
            founder: users[i]._id,
            description: faker.commerce.productDescription(),
            group_image: "https://loremflickr.com/640/480/abstract",
            visibility: faker.helpers.arrayElement(["Invite", "Open"]),
            members,
            tags: groupTags,
            events: [],
            posts: [],
            created_at: createdAt,
        };
        groups.push(group);
        const memberIds = groupMembers.map((obj) => obj._id);

        for (let j = 0; j < users.length; j++) {
            if (memberIds.includes(users[j]._id)) users[j].groups.push(groupId);
        }
        for (let j = 0; j < tags.length; j++) {
            if (groupTags.includes(tags[j]._id)) tags[j].group_list.push(groupId);
        }
    }

    // Add events to each group, and populate with comments, add the event to relevant users and groups
    const events: EventModel[] = [];
    for (let i = 0; i < groups.length; i++) {
        const numOfEvents = Math.floor(Math.random() * 4);

        for (let j = 0; j < numOfEvents; j++) {
            const eventId = getId();
            const eventCreation = randomTimestamp(groups[i].created_at, seedDates.yesterday);
            const possibleCreators = groups[i].members.filter((obj) => obj.is_admin === true);
            const creator = possibleCreators[Math.floor(Math.random() * possibleCreators.length)]._id;
            const attending = cutArray(groups[i].members, 1, 20).map((member) => member._id);
            const commenters = cutArray(attending, 1, 8).map((member) => member._id);
            const eventsComments: Types.ObjectId[] = [];

            for (let k = 0; k < commenters.length; k++) {
                const commentCreation = randomTimestamp(eventCreation, seedDates.recently);
                const comment = {
                    _id: getId(),
                    author: commenters[k],
                    content: faker.random.words(5),
                    ref_id: eventId,
                    ref_model: "Event",
                    likes: cutArray(attending),
                    created_at: commentCreation,
                    updated_at:
                        0.05 > Math.random() ? randomTimestamp(commentCreation, commentCreation + 2000) : undefined,
                };
                eventsComments.push(comment._id);
                comments.push(comment);
            }

            const startsAt = randomTimestamp(seedDates.nextWeek, seedDates.future);

            const event = {
                _id: eventId,
                event: faker.vehicle.vehicle(),
                creator,
                group: groups[i]._id,
                description: faker.commerce.department(),
                attending,
                comments: eventsComments,
                starts_at: startsAt,
                ends_at: 0.3 > Math.random() ? randomTimestamp(startsAt, startsAt + 30000) : undefined,
                created_at: eventCreation,
            };

            events.push(event);

            for (let k = 0; k < users.length; k++) {
                if (attending.includes(users[k]._id)) users[k].events.push(eventId);
            }

            groups[i].events.push(eventId);
        }
    }

    // Create user posts
    for (let i = 0; i < users.length; i++) {
        const postCount = Math.floor(Math.random() * 4);

        for (let j = 0; j < postCount; j++) {
            const { post, postComments } = createPost({
                author: users[i]._id,
                postCreationDate: randomTimestamp(users[i].join_timestamp, seedDates.yesterday),
                connectedUsers: users[i].friends.map((obj) => obj._id),
                ref_id: users[i]._id,
                ref_model: "User",
            });

            posts.push(post);
            users[i].posts.push(post._id);
            postComments.forEach((comment) => comments.push(comment));
        }
    }

    for (let i = 0; i < groups.length; i++) {
        const postCount = Math.floor(Math.random() * 8);

        for (let j = 0; j < postCount; j++) {
            // const author = groups[i].members[j]._id ? groups[i].members[j]._id : groups[i].members[0]._id;
            const authorIndex = Math.floor(Math.random() * groups[i].members.length);
            const author = groups[i].members[authorIndex]._id;
            const { post, postComments } = createPost({
                author,
                postCreationDate: randomTimestamp(groups[i].created_at, seedDates.yesterday),
                connectedUsers: groups[i].members.map((obj) => obj._id),
                ref_id: groups[i]._id,
                ref_model: "Group",
            });

            posts.push(post);
            groups[i].posts.push(post._id);
            postComments.forEach((comment) => comments.push(comment));

            const creator = users.findIndex((user) => user._id.equals(author));
            users[creator].posts.push(post._id);
        }
    }

    // Create hackerman123
    const hackermanPassword = await bcrypt.hash("12345", 10);
    const adminPassword = await bcrypt.hash("admin", 10);

    const hackerman: UserModel = {
        _id: getId(),
        username: "hackerman123",
        password: hackermanPassword,
        first_name: "John",
        last_name: "Cena",
        profile_picture: "/default-profile-picture.jpg",
        is_online: true,
        join_timestamp: seedDates.last_week,
        friends: [],
        messages: [],
        groups: [],
        posts: [],
        tags: [],
        events: [],
        notifications: [],
        chat_notifs: [],
    };

    // Give hackerman friends
    for (let i = 0; i < users.length; i++) {
        if (i % 2 === 0) {
            const earliestDate =
                hackerman.join_timestamp > users[i].join_timestamp ? hackerman.join_timestamp : users[i].join_timestamp;
            const friendshipDate = randomTimestamp(earliestDate, seedDates.now);
            users[i].friends.push({
                _id: hackerman._id,
                timestamp: friendshipDate,
            });
            hackerman.friends.push({
                _id: users[i]._id,
                timestamp: friendshipDate,
            });
        }
    }

    // Give hackerman tags
    for (let i = 0; i < tags.length; i++) {
        if (i % 6 === 0) {
            hackerman.tags.push(tags[i]._id);
            tags[i].user_list.push(hackerman._id);
        }
    }

    // Give hackerman groups
    for (let i = 0; i < groups.length; i++) {
        if (i % 3 === 0) {
            hackerman.groups.push(groups[i]._id);
            groups[i].members.push({
                _id: hackerman._id,
                is_admin: i === 3 ? true : false,
                join_date: randomTimestamp(hackerman.join_timestamp, seedDates.yesterday),
            });

            for (let j = 0; j < groups[i].events.length; j++) {
                if (i % 2 === 0) {
                    hackerman.events.push(groups[i].events[j]);
                    const eventIndex = events.findIndex((event) => event._id === groups[i].events[j]);
                    events[eventIndex].attending.push({
                        _id: hackerman._id,
                        is_confirmed: false,
                    });
                }
            }
        }
    }

    const chats: ChatModel[] = [];
    for (let i = 0; i < 4; i++) {
        const { post, postComments } = createPost({
            author: hackerman._id,
            postCreationDate: randomTimestamp(hackerman.join_timestamp, seedDates.yesterday),
            connectedUsers: hackerman.friends.map((obj) => obj._id),
            ref_id: hackerman._id,
            ref_model: "User",
        });

        posts.push(post);
        hackerman.posts.push(post._id);
        postComments.forEach((comment) => comments.push(comment));

        const chatId = getId();
        const otherMember = hackerman.friends[i]._id;

        const newChat: ChatModel = {
            _id: chatId,
            title: faker.animal.bear(),
            members: [hackerman._id, otherMember],
            messages: [],
        };

        for (let j = 0; j < 10; j++) {
            const newMessage = {
                _id: Math.random() > 0.5 ? hackerman._id : otherMember,
                content: faker.random.words(3),
                timestamp: randomTimestamp(hackerman.join_timestamp, seedDates.now),
            };
            newChat.messages.push(newMessage);
        }

        chats.push(newChat);
        hackerman.messages.push({
            _id: chatId,
            timestamp: seedDates.now,
        });
    }

    const admin: UserModel = {
        _id: getId(),
        username: "admin",
        password: adminPassword,
        first_name: "smiley",
        last_name: "face",
        profile_picture: "/default-profile-picture",
        is_online: true,
        join_timestamp: seedDates.yesterday,
        friends: [
            {
                _id: hackerman._id,
                timestamp: seedDates.recently,
            },
        ],
        messages: [],
        groups: [],
        posts: [],
        tags: [],
        events: [],
        notifications: [],
        chat_notifs: [],
    };

    hackerman.friends.push({
        _id: admin._id,
        timestamp: seedDates.recently,
    });

    users.push(hackerman);
    users.push(admin);

    try {
        await User.insertMany(users);
        console.log("Seeded Users");
        await Tag.insertMany(tags);
        console.log("Seeded Tags");
        await Event.insertMany(events);
        console.log("Seeded Events");
        await Comment.insertMany(comments);
        console.log("Seeded Comments");
        await Post.insertMany(posts);
        console.log("Seeded Posts");
        await Group.insertMany(groups);
        console.log("Seeded Groups");
        await Chat.insertMany(chats);
        console.log("Seeded chats");
    } catch (error) {
        console.log("ERROR => ", error);
        console.log("ERROR");
    }
};
