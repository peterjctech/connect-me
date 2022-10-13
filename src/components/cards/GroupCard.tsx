import { Card, Button } from "common";
import { groupAction } from "helpers";
import { GroupSummary } from "types";

interface GroupCardProps {
    group: GroupSummary;
}

const GroupCard = ({ group }: GroupCardProps) => {
    const action = groupAction(group);
    return (
        <Card title={group.name} image={group.group_image} link={`/groups/${group.group_id}`}>
            <p>
                {group.member_count.total} members ({group.member_count.friends} friends)
            </p>
            {group.my_status && <p>My status: {group.my_status}</p>}
            <p>Restriction: {group.restriction}</p>
            <Button click={() => action.action({ groupId: group.group_id })} type={action.button}>
                {action.text}
            </Button>
        </Card>
    );
};

export default GroupCard;
