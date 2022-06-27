import type { NextPage } from "next";
import { sendPostRequest } from "@helpers";

const Home: NextPage = () => {
    const toBackend = async () => {
        await sendPostRequest("/api/seed", {});
    };
    return (
        <main className="home-page">
            <button onClick={toBackend}>SEED DATABASE</button>
        </main>
    );
};

export default Home;
