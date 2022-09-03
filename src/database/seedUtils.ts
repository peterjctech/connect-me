import { Types } from "mongoose";
import {
    PostModel,
    Color,
    Visibility,
    JoinRestriction,
    EventMemberStatus,
    Reaction,
    GroupStatus,
    MainThemes,
    ColorThemes,
} from "@types";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const getId = () => new Types.ObjectId();

export const selectRandomColor = (): Color => {
    return faker.helpers.arrayElement([
        "red",
        "orange",
        "yellow",
        "green",
        "cyan",
        "blue",
        "purple",
        "magenta",
        "pink",
        "white",
    ]);
};

export const selectRandomPreference = (): Visibility => {
    return faker.helpers.arrayElement(["Nobody", "Friends Only", "Everyone"]);
};

export const selectRandomJoinRestriction = (): JoinRestriction => {
    return faker.helpers.arrayElement(["Private", "Invite", "Open", "Friends"]);
};

export const selectRandomEventStatus = (): EventMemberStatus => {
    return faker.helpers.arrayElement(["Yes", "No", "Maybe"]);
};

export const selectRandomReaction = (): Reaction => {
    return faker.helpers.arrayElement(["Like", "Love", "Sad", "Wow", "Angry"]);
};

export const selectRandomGroupStatus = (): GroupStatus => {
    return faker.helpers.arrayElement(["Admin", "Member", "Pending"]);
};

export const selectRandomMainTheme = (): MainThemes => {
    return faker.helpers.arrayElement(["Light", "Void", "Dark"]);
};

export const selectRandomColorTheme = (): ColorThemes => {
    return faker.helpers.arrayElement(["Blue", "Green", "Purple", "Red"]);
};

export const getRandomTimestamp = (ts1: number, ts2: number) => Math.floor(Math.random() * (ts2 - ts1) + ts1);

interface CutArrayProps {
    range: [number, number] | [number];
    array: any[];
    neglectedIndex?: number;
}

export const cutArray = (props: CutArrayProps) => {
    const lowerLimit = props.range[0];
    const upperLimit = !props.range[1] || props.range[1] > props.array.length ? props.array.length : props.range[1];
    const count = Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    const arr = [];
    for (let i = 0; i < props.array.length; i++) {
        if (i !== props.neglectedIndex) arr.push(props.array[i]);
    }
    const newArr = faker.helpers.uniqueArray(arr, count);
    return newArr;
};

interface CreatePostProps {
    connectedUsers: Types.ObjectId[];
    authorId: Types.ObjectId;
    postCreationDate: number;
}

export const createPost = (props: CreatePostProps) => {
    // if (props.connectedUsers[0].join_timestamp) console.log(props, "aha");
    const post: PostModel = {
        _id: getId(),
        author: props.authorId,
        content: faker.random.words(15),
        reactions: cutArray({ array: props.connectedUsers, range: [0] }).map((id) => {
            return {
                user: id,
                reaction: selectRandomReaction(),
                reaction_timestamp: props.postCreationDate,
            };
        }),
        comments: cutArray({ array: props.connectedUsers, range: [0] }).map((id) => {
            return {
                id: uuidv4(),
                author: id,
                content: faker.random.words(5),
                likes: cutArray({ array: props.connectedUsers, range: [0] }),
                created_timestamp: getRandomTimestamp(props.postCreationDate, dayjs().unix()),
                is_edited: 0.1 > Math.random() ? true : false,
            };
        }),
        created_timestamp: props.postCreationDate,
        is_edited: 0.1 > Math.random() ? true : false,
    };

    return post;
};
