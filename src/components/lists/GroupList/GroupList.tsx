import { useQuery } from "@apollo/client";

import { GET_GROUPS } from "@queries";
import { Loading } from "@components";

interface GroupListProps {
    title: string;
    userId: string;
}

const UserList = ({ title, userId }: GroupListProps) => {
    const { loading, data } = useQuery(GET_GROUPS, { variables: { id: userId } });

    if (loading) {
        return <Loading />;
    }

    console.log(data);

    return (
        <div className="list box">
            <h1>{title}</h1>
        </div>
    );
};

export default UserList;
