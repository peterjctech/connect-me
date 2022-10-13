import dayjs from "dayjs";
import { Chat, User, Event, Group, Post, Tag } from "models";
import { faker } from "@faker-js/faker";
import { dates, probability, randomDate, randomSettings, randomStringArr } from "./seedHelpers";
import { FriendStatus, UserModel } from "types";

export const clearDatabase = async () => {
    console.time("clearDatabase");
    await User.deleteMany();
    await Event.deleteMany();
    await Post.deleteMany();
    await Tag.deleteMany();
    await Group.deleteMany();
    await Chat.deleteMany();
    console.timeEnd("clearDatabase");
};

export const seedUsers = async () => {
    console.time("seedUsers");

    const props = faker.helpers.uniqueArray(faker.internet.userName, 700).map((username) => {
        return {
            username,
            password: faker.internet.password(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            profile_picture: faker.image.avatar(),
            birthday: randomDate(dates.oldest_user, dates.youngest_user),
            intro: faker.random.words(20),
            joined_at: randomDate(dates.creation, dates.last_month),
            settings: randomSettings(),
        };
    });

    const users = await User.insertMany(props).then((data) => JSON.parse(JSON.stringify(data)));

    console.timeEnd("seedUsers");
    return users;
};

export const seedHackerman = async () => {
    console.time("seedHackerman");

    const props = {
        username: "hackerman123",
        password: "12345",
        first_name: "John",
        last_name: "Cena",
        profile_picture: "https://res.cloudinary.com/dducue0l2/image/upload/v1661423403/e8nymlvrv7y48zfk9teu.jpg",
        birthday: dayjs().year(1997).month(8).date(17),
        intro: "I am hackerman, the creator of ConnectMe. Invite me to ur group. This is a threat.",
        joined_at: dates.creation,
        settings: {
            theme: "Void",
            color: "Blue",
        },
    };

    const hackerman = await User.create(props).then((data) => JSON.parse(JSON.stringify(data)));

    console.timeEnd("seedHackerman");
    return hackerman;
};

type AddFriendsProps = { users: UserModel[]; hackerman: UserModel };
export const addFriends = ({ users, hackerman }: AddFriendsProps) => {
    for (let i = 0; i < users.length; i++) {
        const odds = Math.random() * 0.4;
        for (let j = 0; j < i; j++) {
            if (probability(odds)) {
                let iStatus: FriendStatus = "Accepted";
                let jStatus: FriendStatus = "Accepted";
                if (probability(0.2)) {
                    if (probability(0.5)) {
                        iStatus = "Sent";
                        jStatus = "Recieved";
                    } else {
                        jStatus = "Sent";
                        iStatus = "Recieved";
                    }
                }
                users[i].friends.push({
                    user_id: users[j]._id,
                    status: iStatus,
                });
                users[j].friends.push({
                    user_id: users[i]._id,
                    status: jStatus,
                });
            }
        }

        if (probability(0.8)) {
            let iStatus: FriendStatus = "Accepted";
            let hStatus: FriendStatus = "Accepted";

            if (probability(0.2)) {
                if (probability(0.7)) {
                    iStatus = "Sent";
                    hStatus = "Recieved";
                } else {
                    hStatus = "Sent";
                    iStatus = "Recieved";
                }
            }

            users[i].friends.push({
                user_id: hackerman._id,
                status: iStatus,
            });
            hackerman.friends.push({
                user_id: users[i]._id,
                status: hStatus,
            });
        }
    }
};
