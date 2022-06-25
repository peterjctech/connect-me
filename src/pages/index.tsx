import type { NextPage } from "next";
import { sendPostRequest } from "@helpers";

const Home: NextPage = () => {
    const toBackend = async () => {
        await sendPostRequest("/api/user", {
            username: "John Cena 2",
            password: "12345",
            confirmPassword: "12345",
            firstName: "John",
        });
    };
    return (
        <main className="home-page">
            <button onClick={toBackend}>CLICK ME LOL</button>
        </main>
    );
};

export default Home;
