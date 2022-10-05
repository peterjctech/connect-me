import { EventModel, UserModel, TagModel, PostModel, GroupModel } from "types";
import { faker } from "@faker-js/faker";
import { randomIndices, randomStringArr } from "./seedHelpers";
import { colorEnum } from "utils";
import { Tag } from "models";

type AddEventsToUsersProps = {
    users: UserModel[];
    events: EventModel[];
};
export const addEventsToUsers = ({ users, events }: AddEventsToUsersProps) => {
    for (let i = 0; i < events.length; i++) {
        events[i].users.forEach((user) => {
            if (user.status === "Yes") {
                const index = users.findIndex((obj) => obj._id === user.user_id);
                users[index].events.push(events[i]._id);
            }
        });
    }
};

export const seedTags = async () => {
    console.time("seedTags");
    const arr = faker.helpers.uniqueArray(faker.random.word, 200).map((name) => name.toLowerCase());
    const names = arr.filter(function (item, index) {
        return arr.indexOf(item) === index;
    });

    const props = names.map((name) => {
        return { name: name, color: randomStringArr(colorEnum) };
    });

    const tags = await Tag.insertMany(props).then((data) => JSON.parse(JSON.stringify(data)));
    console.timeEnd("seedTags");
    return tags;
};

interface PopulateTagsProps {
    users: UserModel[];
    events: EventModel[];
    posts: PostModel[];
    groups: GroupModel[];
    tags: TagModel[];
}

export const populateTags = ({ users, events, posts, groups, tags }: PopulateTagsProps) => {
    users.forEach((user) => {
        const indices = randomIndices({ range: [3, 10], length: tags.length });
        indices.forEach((num) => {
            user.tags.push(tags[num]._id);
            tags[num].users.push(user._id);
        });
    });
    groups.forEach((group) => {
        const indices = randomIndices({ range: [2, 5], length: tags.length });
        indices.forEach((num) => {
            group.tags.push(tags[num]._id);
            tags[num].groups.push(group._id);
        });
    });
    events.forEach((event) => {
        const indices = randomIndices({ range: [1, 2], length: tags.length });
        indices.forEach((num) => {
            event.tags.push(tags[num]._id);
            tags[num].events.push(event._id);
        });
    });
    posts.forEach((post) => {
        const indices = randomIndices({ range: [2, 8], length: tags.length });
        indices.forEach((num) => {
            post.tags.push(tags[num]._id);
            tags[num].posts.push(post._id);
        });
    });
};
