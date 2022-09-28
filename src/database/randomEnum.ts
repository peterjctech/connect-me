import { faker } from "@faker-js/faker";
import { PrivacyOption } from "@types";
import {
    privacyOptionEnum,
    mainThemeEnum,
    colorThemeEnum,
    joinRestrictionEnum,
    reactionEnum,
    eventUserStatusEnum,
    colorEnum,
} from "@utils";
import { probability } from "./seedUtils";

export const randomPrivacyOption = () => faker.helpers.arrayElement(privacyOptionEnum);

export const randomUserSettings = () => {
    return {
        theme: faker.helpers.arrayElement(mainThemeEnum),
        color: faker.helpers.arrayElement(colorThemeEnum),
        hide_friends: randomPrivacyOption(),
        hide_posts: randomPrivacyOption(),
        hide_groups: randomPrivacyOption(),
        hide_events: randomPrivacyOption(),
    };
};

export const randomJoinRestriction = () => faker.helpers.arrayElement(joinRestrictionEnum);

export const randomGroupSettings = () => {
    return {
        join_restriction: randomJoinRestriction(),
        hide_events: probability(0.5),
        hide_posts: probability(0.5),
    };
};

export const randomReaction = () => faker.helpers.arrayElement(reactionEnum);

export const randomEventUserStatus = () => faker.helpers.arrayElement(eventUserStatusEnum);

export const randomColor = () => faker.helpers.arrayElement(colorEnum);
