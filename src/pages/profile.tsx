import { ProfileLayout, useProfileLayout } from "@layout";

const ProfilePage = () => {
    const data = useProfileLayout();
    console.log(data);
    return (
        <main>
            <h1>Profile Page</h1>
        </main>
    );
};

ProfilePage.PageLayout = ProfileLayout;
export default ProfilePage;
