import {
    ColorThemes,
    MainThemes,
    Reaction,
    VisibilityPreference,
    Color,
    JoinRestriction,
    GroupStatus,
    EventMemberStatus,
} from "@types";

export const reactionEnum: Reaction[] = ["Like", "Love", "Sad", "Wow", "Angry", "Haha"];
export const visibilityEnum: VisibilityPreference[] = ["Nobody", "Friends", "Everyone"];
export const colorEnum: Color[] = [
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
];
export const colorThemeEnum: ColorThemes[] = ["Red", "Green", "Blue", "Purple"];
export const mainThemeEnum: MainThemes[] = ["Light", "Void", "Dark"];
export const joinRestrictionEnum: JoinRestriction[] = ["Friends", "Invite", "Open", "Private"];
export const groupStatusEnum: GroupStatus[] = ["Founder", "Admin", "Member", "Pending", "Banned"];
export const eventStatusEnum: EventMemberStatus[] = ["Yes", "No", "Maybe"];
