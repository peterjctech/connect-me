import Head from "next/head";
import { ProfileLayout } from "@layouts";

const ProfilePage = () => {
    return (
        <div>
            <Head>
                <title>Profile | ConnectMe</title>
            </Head>
            <ProfileLayout>
                <h1>ProfilePage</h1>
            </ProfileLayout>
        </div>
    );
};

export default ProfilePage;
