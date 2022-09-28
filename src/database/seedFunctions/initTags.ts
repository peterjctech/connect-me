import { faker } from "@faker-js/faker";
import { TagSchema } from "@models";
import { IEvent, IGroup, IPost, IUser } from "@types";

import { randomColor } from "../randomEnum";
import { randomIndices } from "../seedUtils";

interface InitTagsProps {
    users: IUser[];
    groups: IGroup[];
    posts: IPost[];
    events: IEvent[];
}

export default async function ({ users, groups, events, posts }: InitTagsProps) {
    console.time("initTags");
    const arr = faker.helpers.uniqueArray(faker.random.word, 200).map((name) => name.toLowerCase());
    const names = arr.filter(function (item, index) {
        return arr.indexOf(item) === index;
    });

    const tagSeeds = names.map((name) => {
        return {
            name: name,
            color: randomColor(),
        };
    });

    const tags = await TagSchema.insertMany(tagSeeds).then((data) => {
        return JSON.parse(JSON.stringify(data));
    });

    for (let i = 0; i < users.length; i++) {
        const indices = randomIndices({ range: [3, 10], length: tags.length });
        indices.forEach((num) => {
            users[i].tags.push(tags[num]._id);
            tags[num].users.push(users[i]._id);
        });
    }
    for (let i = 0; i < groups.length; i++) {
        const indices = randomIndices({ range: [2, 5], length: tags.length });
        indices.forEach((num) => {
            groups[i].tags.push(tags[num]._id);
            tags[num].groups.push(groups[i]._id);
        });
    }
    for (let i = 0; i < events.length; i++) {
        const indices = randomIndices({ range: [1, 2], length: tags.length });
        indices.forEach((num) => {
            events[i].tags.push(tags[num]._id);
            tags[num].events.push(events[i]._id);
        });
    }
    for (let i = 0; i < posts.length; i++) {
        const indices = randomIndices({ range: [4, 8], length: tags.length });
        indices.forEach((num) => {
            posts[i].tags.push(tags[num]._id);
            tags[num].posts.push(posts[i]._id);
        });
    }

    console.timeEnd("initTags");
    return tags;
}
