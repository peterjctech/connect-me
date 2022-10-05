import { Group, User, Event, Post, Tag, Chat } from "models";
import { clearDatabase, seedFriends, seedHackerman, seedUsers } from "./seed1";
import { addChatsToUsers, seedChats } from "./seed2";
import { seedGroups } from "./seed3";
import { addGroupsToUsers, seedPosts } from "./seed4";
import { seedEvents } from "./seed5";
import { addEventsToUsers, populateTags, seedTags } from "./seed6";

export const seedDatabase = async () => {
    await clearDatabase();
    const users = await seedUsers();
    const hackerman = await seedHackerman();
    const friendships = await seedFriends({ users, hackerman });
    const chats = await seedChats({ users, hackerman });
    addChatsToUsers({ users, hackerman, chats });
    const groups = await seedGroups({ users, hackerman });
    addGroupsToUsers({ users, hackerman, groups });
    users.push(hackerman);
    const posts = await seedPosts({ users, groups, friendships });
    const events = await seedEvents({ users, groups, friendships });
    addEventsToUsers({ events, users });
    const tags = await seedTags();
    populateTags({ users, groups, posts, events, tags });

    console.time("Finalize Users");
    for (let i = 0; i < users.length; i++) {
        await User.findByIdAndUpdate(users[i]._id, users[i]);
    }
    console.timeEnd("Finalize Users");

    console.time("Finalize Groups");
    for (let i = 0; i < groups.length; i++) {
        await Group.findByIdAndUpdate(groups[i]._id, groups[i]);
    }
    console.timeEnd("Finalize Groups");

    console.time("Finalize Posts");
    for (let i = 0; i < posts.length; i++) {
        await Post.findByIdAndUpdate(posts[i]._id, posts[i]);
    }
    console.timeEnd("Finalize Posts");

    console.time("Finalize Events");
    for (let i = 0; i < events.length; i++) {
        await Event.findByIdAndUpdate(events[i]._id, events[i]);
    }
    console.timeEnd("Finalize Events");

    console.time("Finalize Chats");
    for (let i = 0; i < chats.length; i++) {
        await Chat.findByIdAndUpdate(chats[i]._id, chats[i]);
    }
    console.timeEnd("Finalize Chats");

    console.time("Finalize Tags");
    for (let i = 0; i < tags.length; i++) {
        await Tag.findByIdAndUpdate(tags[i]._id, tags[i]);
    }
    console.timeEnd("Finalize Tags");

    console.log("Seed complete");
};
