import type { NextPage } from "next";
import { Layout } from "@components";

const Home: NextPage = () => {
    return (
        <Layout title="Home">
            <main className="home-page">
                <h1>Hello World</h1>
            </main>
        </Layout>
    );
};

export default Home;
