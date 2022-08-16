import { useState, useEffect } from "react";
import { setUserStore } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Loading } from "@layout";
import { client } from "@utils";
import { INITIALIZE_STORE } from "@queries";
import { StoreInterface } from "@types";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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
    }, []);

    return (
        <div className="main-layout">
            <Navbar />
            {loading ? <Loading /> : children}
        </div>
    );
};

export default MainLayout;
