import { TEST } from "@queries";
import { useQuery } from "@apollo/client";
import { Loading } from "@components";

const FeedPage = () => {
    const { loading, data } = useQuery(TEST);
    if (loading) {
        return <Loading />;
    }

    console.log(data);
    return (
        <main>
            <h1>FeedPage</h1>
        </main>
    );
};

export default FeedPage;
