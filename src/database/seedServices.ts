import { Types } from "mongoose";
import { faker } from "@faker-js/faker";

import { dates, probability, randomDate } from "./seedUtils";
import { randomReaction } from "./randomEnum";

interface SeedServiceProps {
    users: Types.ObjectId[];
    earliestDate: Date;
}

export const seedReactions = ({ users, earliestDate }: SeedServiceProps) => {
    const response = users
        .filter(() => probability(0.3))
        .map((id) => {
            return {
                user: id,
                reaction: randomReaction(),
                reacted_at: randomDate(earliestDate, dates.now),
            };
        });
    return response;
};

export const seedComments = ({ users, earliestDate }: SeedServiceProps) => {
    const response = users
        .filter(() => probability(0.2))
        .map((id) => {
            return {
                author: id,
                content: faker.random.words(7),
                likes: users.filter(() => probability(0.3)),
                created_at: randomDate(earliestDate, dates.now),
                is_edited: probability(0.1),
            };
        });
    return response;
};
