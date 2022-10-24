import { TagSummary } from "types";

const removeTag = (props: { tagId: string }) => {
    // TODO: removeTag
    console.log("removeTag");
};
const addTag = (props: { tagId: string }) => {
    // TODO: addTag
    console.log("addTag");
};

interface TagActionReturn {
    button: "success" | "warning" | "info" | "error" | "help" | "disabled";
    text: string;
    action: (props: { tagId: string }) => void;
}

export const tagAction = (tag: TagSummary): TagActionReturn => {
    if (tag.is_added) {
        return { action: removeTag, button: "error", text: "Remove Tag" };
    } else {
        return { action: addTag, button: "success", text: "Add Tag" };
    }
};
