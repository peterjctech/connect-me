import { GroupSummary } from "types";

const requestGroupInvite = (props: { groupId: string }) => {
    // TODO: requestGroupInvite
    console.log("requestGroupInvite");
};
const joinGroup = (props: { groupId: string }) => {
    // TODO: joinGroup
    console.log("joinGroup");
};
const leaveGroup = (props: { groupId: string }) => {
    // TODO: leaveGroup
    console.log("leaveGroup");
};
const acceptGroupInvite = (props: { groupId: string }) => {
    // TODO: acceptGroupInvite
    console.log("acceptGroupInvite");
};
const cancelInviteRequest = (props: { groupId: string }) => {
    // TODO: cancelInviteRequest
    console.log("cancelInviteRequest");
};

interface GroupActionReturn {
    button: "success" | "warning" | "info" | "error" | "help" | "disabled";
    text: string;
    action: (props: { groupId: string }) => void;
}

export const groupAction = (group: GroupSummary): GroupActionReturn => {
    if (group.my_status === "Admin" || group.my_status === "Member") {
        return { action: leaveGroup, button: "error", text: "Leave Group" };
    } else if (group.my_status === "Invited") {
        return { action: acceptGroupInvite, button: "success", text: "Accept Group Invite" };
    } else if (group.my_status === "RequestedInvite") {
        return { action: cancelInviteRequest, button: "warning", text: "Cancel Invitation Request" };
    } else if (group.my_status === "Banned") {
        return { action: () => {}, button: "disabled", text: "Banned" };
    } else if (group.restriction === "Open") {
        return { action: joinGroup, button: "success", text: "Join Group" };
    } else if (group.restriction === "Invite") {
        return { action: requestGroupInvite, button: "help", text: "Request Group Invite" };
    } else {
        return { action: () => {}, button: "disabled", text: "Private Group" };
    }
};
