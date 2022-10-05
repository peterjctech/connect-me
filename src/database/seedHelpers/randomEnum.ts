import { faker } from "@faker-js/faker";
import { mainThemeEnum, colorThemeEnum, privacyOptionEnum } from "utils";

export const randomStringArr = (arr: string[]) => {
    return faker.helpers.arrayElement(arr);
};

export const randomSettings = () => {
    return {
        theme: randomStringArr(mainThemeEnum),
        color: randomStringArr(colorThemeEnum),
        default_post_is_public: faker.helpers.arrayElement([true, false]),
        group_privacy: randomStringArr(privacyOptionEnum),
        event_privacy: randomStringArr(privacyOptionEnum),
        friend_privacy: randomStringArr(privacyOptionEnum),
    };
};
