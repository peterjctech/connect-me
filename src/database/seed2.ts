import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import { probability, randomDate, randomNumber, dates, getLastDate } from "./seedHelpers";
import { Chat } from "models";
import { ChatModel, UserModel } from "types";

export const seedChats = async ({ users, hackerman }: { users: UserModel[]; hackerman: UserModel }) => {
    console.time("seedChats");

    const seedData = [
        { title: "The Homies", members: [1, 4] },
        { title: "study group", members: [18, 22, 84] },
        { title: "the bois", members: [3, 9, 19] },
        { title: "Besties <3", members: [1] },
        { title: "i like u", members: [88] },
        { title: "????", members: [90] },
        { title: "asdlfj;adsg", members: [99] },
        { title: "Squad", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { title: "give money pls", members: [55] },
    ];

    const props = seedData.map((chat) => {
        const members = chat.members.map((num) => {
            return {
                user_id: users[num]._id,
                first_name: users[num].first_name,
                added_on: randomDate(users[num].joined_at, dates.now),
            };
        });
        const earliestMember = getLastDate(members.map((obj) => obj.added_on));
        members.push({ user_id: hackerman._id, added_on: earliestMember, first_name: hackerman.first_name });

        const messages: any[] = [];
        const messageCount = randomNumber(members.length * 5, members.length * 10);
        for (let i = 0; i < messageCount; i++) {
            const num = randomNumber(0, members.length - 1);
            messages.push({
                sender: members[num].user_id,
                content: faker.random.words(5),
                sent_at: randomDate(members[num].added_on, dates.now),
            });
        }
        const lastMessage = messages.sort((a, b) => dayjs(b.sent_at).unix() - dayjs(a.sent_at).unix())[0];

        const activity: any[] = [];

        for (let i = 0; i < members.length; i++) {
            if (members[i].added_on !== earliestMember) {
                activity.push({
                    message: `${members[i].first_name} joined the chat`,
                    date: members[i].added_on,
                });
            }
        }

        return {
            title: chat.title,
            members: members.map((obj) => {
                return {
                    user_id: obj.user_id,
                    is_read: obj.user_id === lastMessage ? true : probability(0.5),
                };
            }),
            messages,
            activity,
        };
    });

    const chats = await Chat.insertMany(props).then((data) => JSON.parse(JSON.stringify(data)));

    console.timeEnd("seedChats");
    return chats;
};

interface AddChatsToUsersProps {
    chats: ChatModel[];
    users: UserModel[];
    hackerman: UserModel;
}

export const addChatsToUsers = ({ chats, users, hackerman }: AddChatsToUsersProps) => {
    chats.forEach((chat) => {
        for (let i = 0; i < chat.members.length; i++) {
            const member = chat.members[i];
            if (member.user_id === hackerman._id) {
                hackerman.chats.push(chat._id);
            } else {
                const index = users.findIndex((obj) => obj._id === chat.members[i].user_id);
                users[index].chats.push(chat._id);
            }
        }
    });
};
