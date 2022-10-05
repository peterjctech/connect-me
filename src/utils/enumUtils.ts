import {
    MainTheme,
    ColorTheme,
    PrivacyOption,
    Color,
    Change,
    Reaction,
    EventMemberStatus,
    EventRestriction,
    GroupMemberStatus,
    GroupRestriction,
    GroupUserStatus,
} from "types";

export const groupMemberStatusEnum: GroupMemberStatus[] = ["Admin", "Member"];
export const groupRestrictionEnum: GroupRestriction[] = ["Friends", "Invite", "Open", "Private"];
export const groupUserStatusEnum: GroupUserStatus[] = ["Banned", "Invited", "Requested Invite"];
export const eventMemberStatusEnum: EventMemberStatus[] = ["Invited", "Maybe", "No", "Yes"];
export const eventRestrictionEnum: EventRestriction[] = ["Friends", "Members", "Open", "Private"];
export const reactionEnum: Reaction[] = ["Angry", "Haha", "Like", "Love", "Sad", "Wow"];
export const changeEnum: Change[] = ["Commented", "Created", "Reacted"];
export const mainThemeEnum: MainTheme[] = ["Dark", "Void", "Light"];
export const colorThemeEnum: ColorTheme[] = ["Blue", "Green", "Purple", "Red"];
export const privacyOptionEnum: PrivacyOption[] = ["Everyone", "Friends Only", "Private", "Show Mutual"];
export const colorEnum: Color[] = [
    "blue",
    "cyan",
    "green",
    "magenta",
    "orange",
    "pink",
    "purple",
    "red",
    "white",
    "yellow",
];
