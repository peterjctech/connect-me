import { client } from "@utils";
import { Button } from "@components";
import { GET_BASE_PROFILE_DATA } from "@queries";

interface ProfileLayoutProps {
    children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
    const func = async () => {
        const response = await client.query({ query: GET_BASE_PROFILE_DATA });
        console.log(response.data.getBaseProfileData);
    };

    return (
        <main>
            <Button click={func}>TEST</Button>
            {children}
        </main>
    );
};

export default ProfileLayout;
