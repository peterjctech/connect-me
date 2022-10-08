import { Color } from "./modelTypes/tagModelTypes";

export interface BriefTagSummary {
    tag_id: string;
    name: string;
}

export interface TagSummary {
    tag_id: string;
    name: string;
    color: Color;
    is_added: boolean;
}
