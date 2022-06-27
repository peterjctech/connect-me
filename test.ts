import { faker } from "@faker-js/faker";

const users = faker.helpers.uniqueArray(faker.internet.userName, 100).map((username, index) => {
    const newUser = {
        _id: index,
        username: username,
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        profile_picture: faker.image.avatar(),
        is_online: 0.4 > Math.random() ? true : false,
        join_date: 0,
        friends: [],
        messages: [],
        groups: [],
        posts: [],
        tags: [],
        events: [],
        notifications: [],
        friend_requests: [],
        chat_notifs: [],
    };

    return newUser;
});

console.log(users.length);
