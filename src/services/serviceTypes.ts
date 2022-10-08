import { PrivacyOption } from "../types";

export type Self = { selfId: string };
export type SelfUser = { selfId: string; userId: string };
export type SelfUserFriendSkip = { selfId: string; userId: string; isFriend: boolean; skipDate: Date };
export type SelfGroupMemberSkip = { selfId: string; groupId: string; isMember: boolean; skipDate: Date };
export type SelfUserFriendPrivacy = { selfId: string; userId: string; privacy: PrivacyOption; isFriend: boolean };
export type SelfTagSkip = { selfId: string; tagId: string; skipDate: Date };
export type SelfPost = { selfId: string; postId: string };
