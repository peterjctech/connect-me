import { UserSchema, GroupSchema, PostSchema, TagSchema, EventSchema, ChatSchema } from "@models";
import clearDatabase from "./seedFunctions/clearDatabase";
import initChats from "./seedFunctions/initChats";
import initEventsAndPosts from "./seedFunctions/initEventsAndPosts";
import initGroups from "./seedFunctions/initGroups";
import initTags from "./seedFunctions/initTags";
import initUsers from "./seedFunctions/initUsers";

export const seedDatabase = async () => {
    await clearDatabase();
    const users = await initUsers();
    const groups = await initGroups({ users });
    const { posts, events } = await initEventsAndPosts({ users, groups });
    const tags = await initTags({ users, groups, events, posts });
    const chats = await initChats(users);

    console.time("users");
    for (let i = 0; i < users.length; i++) {
        await UserSchema.findByIdAndUpdate(users[i]._id, users[i]);
    }
    console.timeEnd("users");

    console.time("groups");
    for (let i = 0; i < groups.length; i++) {
        await GroupSchema.findByIdAndUpdate(groups[i]._id, groups[i]);
    }
    console.timeEnd("groups");

    console.time("posts");
    for (let i = 0; i < posts.length; i++) {
        await PostSchema.findByIdAndUpdate(posts[i]._id, posts[i]);
    }
    console.timeEnd("posts");

    console.time("events");
    for (let i = 0; i < events.length; i++) {
        await EventSchema.findByIdAndUpdate(events[i]._id, events[i]);
    }
    console.timeEnd("events");

    console.time("tags");
    for (let i = 0; i < tags.length; i++) {
        await TagSchema.findByIdAndUpdate(tags[i]._id, tags[i]);
    }
    console.timeEnd("tags");

    console.time("chats");
    for (let i = 0; i < chats.length; i++) {
        await ChatSchema.findByIdAndUpdate(chats[i]._id, chats[i]);
    }
    console.timeEnd("chats");

    return "Seeded Database";
};
