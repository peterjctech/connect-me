import { useQuery } from "@apollo/client";
import { Loading } from "@layout";
import { Sidebar, Chatbar } from "@domain";
import { useSelector } from "react-redux";
// import { GET_USER_DATA } from "@queries";

const HomePage = () => {
    const userStore = useSelector((state: any) => state.user);
    // const { data, loading } = useQuery(GET_USER_DATA);

    // if (loading) {
    //     return <Loading />;
    // }

    console.log(userStore.id);
    return (
        <main className="home-page">
            <Sidebar />
            <section>
                <h1>Home Page</h1>
            </section>
            <Chatbar />
        </main>
    );
};

export default HomePage;
