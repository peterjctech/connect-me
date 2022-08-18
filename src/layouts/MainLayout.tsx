import { useEffect, useState } from "react";
import { setUserStore } from "@store";
import { useSelector, useDispatch } from "react-redux";
import { StoreInterface } from "@types";
import { client } from "@utils";
import { INITIALIZE_STORE } from "@queries";
import { Loading, Navbar } from "@components";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
    const userStore = useSelector((state: StoreInterface) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeStore = async () => {
            const response = await client.query({ query: INITIALIZE_STORE });
            dispatch(setUserStore(response.data.initializeStore));
            setLoading(false);
        };

        if (userStore.is_initialized) {
            setLoading(false);
        } else {
            initializeStore();
        }
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={`app--${userStore.theme === "Dark" ? "dark" : "light"}`}>
            <Navbar />
            {props.children}
        </div>
    );
};

export default MainLayout;
