import type { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { User } from "@interfaces";
import { GET_ALL_USERS } from "@queries";

const Home: NextPage = () => {
    const { data, loading, error } = useQuery(GET_ALL_USERS);

    if (loading) {
        return <h1>Loading</h1>;
    }
    if (error) {
        return <h1>Error</h1>;
    }
    console.log(data);
    return (
        <main className="home-page">
            <h1>Hello World</h1>
        </main>
    );
};

// export function getServerSideProps() {}

export default Home;
