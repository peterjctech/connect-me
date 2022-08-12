import Head from "next/head";
import { useState, useEffect } from "react";
import { setUserStore } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Loading, Navbar } from "@components";
import { client } from "@utils";
// import { GET_ME } from "@queries";
// import { StateInterface } from "@types";

interface MainLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function ({ title, children }: MainLayoutProps) {
    // const userStore = useSelector((state: StateInterface) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const initializeStore = async () => {
        //     const response = await client.query({ query: GET_ME });
        //     dispatch(setUserStore(response.data.getMe));
        //     setLoading(false);
        // };
        // if (userStore.is_initialized) {
        //     setLoading(false);
        // } else {
        //     initializeStore();
        // }
    }, []);

    const pageTitle = `${title} | ConnectMe`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Navbar />
            {loading ? <Loading /> : children}
        </>
    );
}
