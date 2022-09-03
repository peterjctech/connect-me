import { useState, useEffect } from "react";
import { Navbar, Topbar, Loading, Rightbar } from "@components";
import { client } from "@utils";
import { INITIALIZE_STORE } from "@queries";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "@types";
import { setUserStore } from "@store";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const userStore = useSelector((state: StoreInterface) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

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
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div
            className={`app--${userStore.theme ? userStore.theme.toLowerCase() : "light"} ${
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
