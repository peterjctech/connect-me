import { faker } from "@faker-js/faker";
import { IUser } from "@types";
import { ChatSchema } from "@models";

import { dates, getLastDate, randomDate, randomNumber } from "../seedUtils";

export default async function (users: IUser[]) {
    const chatData = [
        { title: "The Homies", members: [0, 1, 4] },
        { title: "study group", members: [0, 18, 22, 84] },
        { title: "the bois", members: [0, 3, 9, 19] },
        { title: "Besties <3", members: [0, 1] },
        { title: null, members: [0, 88] },
        { title: null, members: [0, 90] },
        { title: null, members: [0, 90] },
        { title: "Squad", members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { title: null, members: [0, 55] },
    ];

    const chatSeeds: any[] = [];
    chatData.forEach((obj) => {
        const joins = obj.members.map((i) => users[i].joined_at);
        const earliest = getLastDate(joins);
        const created = randomDate(earliest, dates.last_week);
        const messages = [];
        const members = [];

        const messageCount = randomNumber(obj.members.length * 5, obj.members.length * 10);
        for (let i = 0; i < messageCount; i++) {
            const index = faker.helpers.arrayElement(obj.members);
            messages.push({
                user: users[index]._id,
                content: faker.random.words(5),
                sent_at: randomDate(created, dates.now),
            });
        }

        for (let i = 0; i < obj.members.length; i++) {
            const userId = users[obj.members[i]]._id;
            const userMessages = messages.filter((msg) => msg.user === userId);
            const last_read = getLastDate(userMessages.map((msg) => msg.sent_at));
            members.push({ user: userId, last_read });
        }

        let response: any = { messages, members };
        if (obj.title) response = { ...response, title: obj.title };
        chatSeeds.push(response);
    });

    const chats = await ChatSchema.insertMany(chatSeeds).then((data) => {
        return JSON.parse(JSON.stringify(data));
    });

    for (let i = 0; i < chats.length; i++) {
        const members = chats[i].members;
        for (let j = 0; j < members.length; j++) {
            const index = users.findIndex((user) => user._id === members[j].user);
            users[index].chats.push(chats[i]._id);
        }
    }

    return chats;
}
