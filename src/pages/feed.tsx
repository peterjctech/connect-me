import { useQuery } from "@apollo/client";
import { Loading } from "@components";
import { GET_USER_DATA } from "@queries";
import { StoreInterface } from "@types";
import { useSelector } from "react-redux";

const FeedPage = () => {
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { loading, data } = useQuery(GET_USER_DATA, { variables: { userId: userStore.user_id } });
    if (loading) {
        return <Loading />;
    }

    console.log(data.getUserData);
    return (
        <main>
            <h1>FeedPage</h1>
        </main>
    );
};

export default FeedPage;
