import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { eventMemberStatusEnum, eventRestrictionEnum, reactionEnum } from "utils";
import { randomStringArr } from "./randomEnum";
import { probability, randomRelativeDate, randomNumber, randomDate, dates } from "./seedUtils";

export const seedReactions = (userIds: Types.ObjectId[]) => {
    const reactors = userIds.filter(() => probability());

    return reactors.map((id) => {
        return { user_id: id, reaction: randomStringArr(reactionEnum) };
    });
};

export const seedComments = (props: { relevantUsers: Types.ObjectId[]; createdAt: Date }) => {
    const commenters = props.relevantUsers.filter(() => probability());

    const comments = commenters.map((id) => {
        return {
            author_id: id,
            content: faker.random.words(7),
            likes: props.relevantUsers.filter(() => probability(0.1)),
            created_at: randomRelativeDate(props.createdAt, 9),
            is_edited: probability(0.1),
        };
    });

    const mostRecentComment = comments.sort((a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix())[0];
    return { comments, mostRecentComment };
};

interface PostSeedDataProps {
    authorId: Types.ObjectId;
    groupId?: Types.ObjectId;
    createdAt: Date;
    relevantUsers: Types.ObjectId[];
}
export const getPostSeedData = ({ authorId, groupId, createdAt, relevantUsers }: PostSeedDataProps) => {
    const { comments, mostRecentComment } = seedComments({ relevantUsers, createdAt });
    const reactions = seedReactions(relevantUsers);
    let last_change = { user_id: authorId, change: "Created", changed_at: createdAt };

    if (mostRecentComment || reactions.length) {
        let isReaction = probability(0.3);
        if (!mostRecentComment) isReaction = true;
        if (!reactions.length) isReaction = false;

        if (isReaction) {
            const index = randomNumber(0, reactions.length - 1);
            last_change = {
                user_id: reactions[index].user_id,
                change: "Reacted",
                changed_at: randomRelativeDate(createdAt, 9),
            };
        } else {
            last_change = {
                user_id: mostRecentComment.author_id,
                change: "Commented",
                changed_at: mostRecentComment.created_at,
            };
        }
    }

    return {
        author_id: authorId,
        group_id: groupId,
        content: faker.random.words(30),
        reactions,
        comments,
        created_at: createdAt,
        last_change,
        is_edited: probability(0.1),
        is_public: probability(0.6),
    };
};

interface EventSeedDataProps {
    creator: Types.ObjectId;
    refID: Types.ObjectId;
    refModel: "Group" | "User";
    relevantUsers: Types.ObjectId[];
    createdAt: Date;
}
export const getEventSeedData = ({ refID, refModel, createdAt, relevantUsers, creator }: EventSeedDataProps) => {
    const join_restriction = randomStringArr(eventRestrictionEnum);
    const possibleStatuses = join_restriction === "Open" ? ["Yes", "Maybe", "No"] : eventMemberStatusEnum;
    const eventUsers = relevantUsers
        .filter(() => probability(0.4))
        .map((id) => {
            return { user_id: id, status: randomStringArr(possibleStatuses) };
        });

    const starts_at = randomDate(dates.next_week, dates.future);
    let ends_at;
    if (probability(0.5)) ends_at = randomRelativeDate(starts_at, 1);
    const { comments, mostRecentComment } = seedComments({ relevantUsers, createdAt });
    const reactions = seedReactions(relevantUsers);
    let last_change = { user_id: creator, change: "Created", changed_at: createdAt };

    if (mostRecentComment || reactions.length) {
        let isReaction = probability(0.3);
        if (!mostRecentComment) isReaction = true;
        if (!reactions.length) isReaction = false;

        if (isReaction) {
            const index = randomNumber(0, reactions.length - 1);
            last_change = {
                user_id: reactions[index].user_id,
                change: "Reacted",
                changed_at: randomRelativeDate(createdAt, 9),
            };
        } else {
            last_change = {
                user_id: mostRecentComment.author_id,
                change: "Commented",
                changed_at: mostRecentComment.created_at,
            };
        }
    }

    return {
        ref_id: refID,
        ref_model: refModel,
        name: faker.vehicle.vehicle(),
        description: faker.commerce.productDescription(),
        users: eventUsers,
        reactions,
        comments,
        created_at: createdAt,
        starts_at,
        ends_at,
        last_change,
        restriction: join_restriction,
    };
};
