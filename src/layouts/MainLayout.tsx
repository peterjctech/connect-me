import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { client } from "utils";
import { INITIALIZE_STORE } from "@queries";
import { StoreInterface } from "types";
import { setUserStore } from "store";
import { Navbar, Topbar, Rightbar } from "components";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const dispatch = useDispatch();
    const userStore = useSelector((state: StoreInterface) => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const response = await client.query({ query: INITIALIZE_STORE });
                dispatch(setUserStore(response.data.initializeStore));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        if (userStore.is_initialized) {
            setLoading(false);
        } else {
            init();
        }
    }, []);

    if (loading) {
        return <h1>Loading</h1>;
    }

    return (
        <div
            className={`app app--${userStore.theme ? userStore.theme.toLowerCase() : "light"} ${
                userStore.color ? userStore.color.toLowerCase() : "blue"
            }`}
        >
            <Navbar />
            <Topbar />
            <Rightbar />
            {children}
        </div>
    );
};

export default MainLayout;
