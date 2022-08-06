import Head from "next/head";
import { useState, useEffect } from "react";
import { setUserStore } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "@components";
import { client } from "@utils";
import { GET_ME } from "@queries";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function ({ title, children }: LayoutProps) {
    const userStore = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userStore.is_initialized) {
            setLoading(false);
        } else {
            initializeStore();
        }
    }, []);

    const initializeStore = async () => {
        const response = await client.query({ query: GET_ME });
        dispatch(setUserStore(response.data.getMe));
        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>{`ConnectMe | ${title}`}</title>
            </Head>
            <h1>Layout</h1>
            {loading ? <Loading /> : children}
        </>
    );
}
