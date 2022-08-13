import { INITIALIZE_STORE } from "@queries";
import { client } from "@utils";
import { useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import Loading from "./Loading";

interface ProfileLayoutProps {
    children: React.ReactNode;
}

const ProfileContext = createContext<any>(null);

export function useProfileLayout() {
    const data = useContext(ProfileContext);
    if (data === null) {
        throw new Error("Profile Layout was used incorrectly");
    }
    return data;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
    const { data, loading } = useQuery(INITIALIZE_STORE);
    console.log("here");

    if (loading) {
        return <Loading />;
    }

    if (data) {
        return (
            <ProfileContext.Provider value={{ data: data.initializeStore }}>
                <div>
                    <h1>Profile Layout</h1>
                    {children}
                </div>
            </ProfileContext.Provider>
        );
    }
};

export default ProfileLayout;
