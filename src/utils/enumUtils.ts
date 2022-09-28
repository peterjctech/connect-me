import {
    Color,
    ColorTheme,
    EventUserStatus,
    GroupUserStatus,
    JoinRestriction,
    MainTheme,
    PrivacyOption,
    Reaction,
} from "types/enumTypes";

export const groupUserStatusEnum: GroupUserStatus[] = ["Admin", "Banned", "Denied", "Invited", "Member", "Pending"];
export const eventUserStatusEnum: EventUserStatus[] = ["Denied", "Invited", "Maybe", "No", "Pending", "Yes"];
export const privacyOptionEnum: PrivacyOption[] = ["Associates", "Everyone", "Nobody"];
export const mainThemeEnum: MainTheme[] = ["Dark", "Light", "Void"];
export const colorThemeEnum: ColorTheme[] = ["Blue", "Green", "Purple", "Red"];
export const joinRestrictionEnum: JoinRestriction[] = ["Associates", "Invite", "Open", "Private"];
export const reactionEnum: Reaction[] = ["Angry", "Haha", "Like", "Love", "Sad", "Wow"];
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
