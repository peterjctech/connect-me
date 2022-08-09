import { ProfileLayout, MainLayout } from "@components";
import { useSelector } from "react-redux";
import { StateInterface } from "@types";

export default function () {
    const userStore = useSelector((state: StateInterface) => state.user);

    return (
        <MainLayout title={userStore.full_name}>
            <ProfileLayout>
                <main>
                    <h1>Profile Home</h1>
                </main>
            </ProfileLayout>
        </MainLayout>
    );
}
