import Head from "next/head";
import { Button } from "@components";
import { useDispatch } from "react-redux";
import { setTheme } from "@store";

const HomePage = () => {
    const dispatch = useDispatch();

    const switchTheme = () => dispatch(setTheme());

    return (
        <main className="home-page">
            <Head>
                <title>Home | ConnectMe</title>
            </Head>
            <Button click={switchTheme}>Switch Theme</Button>
        </main>
    );
};

export default HomePage;
