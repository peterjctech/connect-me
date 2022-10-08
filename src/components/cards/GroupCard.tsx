import { GroupSummary } from "types";

interface GroupCardProps {
    group: GroupSummary;
}

const GroupCard = ({ group }: GroupCardProps) => {
    return (
        <div>
            <h1>GroupCard</h1>
        </div>
    );
};

export default GroupCard;
