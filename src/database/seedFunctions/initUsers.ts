import { UserSchema } from "@models";
import { faker } from "@faker-js/faker";
import { randomDate, dates, probability, getLastDate } from "../seedUtils";
import { randomUserSettings } from "../randomEnum";

export default async function () {
    console.time("initUsers");
    const userProps: any[] = faker.helpers.uniqueArray(faker.internet.userName, 1000).map((name) => {
        return {
            username: name,
            password: faker.internet.password(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            profile_picture: faker.image.avatar(),
            joined_at: randomDate(dates.creation, dates.last_month),
            settings: randomUserSettings(),
        };
    });

    userProps.unshift({
        username: "hackermans_bestie",
        password: "1234567",
        first_name: "Barack",
        last_name: "Obama",
        joined_at: dates.last_month,
    });
    userProps.unshift({
        username: "hackerman123",
        password: "12345",
        first_name: "John",
        last_name: "Cena",
        profile_picture: "https://res.cloudinary.com/dducue0l2/image/upload/v1661423403/e8nymlvrv7y48zfk9teu.jpg",
        joined_at: dates.creation,
    });

    const users = await UserSchema.insertMany(userProps).then((data) => {
        return JSON.parse(JSON.stringify(data));
    });

    for (let i = 0; i < users.length; i++) {
        const odds = i < 2 ? 0.2 : 0.1;
        for (let j = 0; j < i; j++) {
            if (probability(odds)) {
                const earliest = getLastDate([users[i].joined_at, users[j].joined_at]);
                const friended_at = randomDate(earliest, dates.now);
                users[i].friends.push({ user: users[j]._id, friended_at });
                users[j].friends.push({ user: users[i]._id, friended_at });
            }
        }

        users[i].activity.push({
            ref_id: users[i]._id,
            ref_model: "User",
            message: "Joined",
            date: users[i].joined_at,
        });
    }
    console.timeEnd("initUsers");

    return users;
}
