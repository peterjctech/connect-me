import { useSelector } from "react-redux";
import { StateInterface } from "@types";
import Link from "next/link";

interface ProfileLayoutProps {
    children: React.ReactNode;
}

export default function ({ children }: ProfileLayoutProps) {
    const userStore = useSelector((state: StateInterface) => state.user);

    console.log(userStore.profile_picture);

    return (
        <div>
            <h1>{userStore.full_name}</h1>
            <img src={userStore.profile_picture} />
            <h1>Joined at: {userStore.join_date}</h1>
            <h1>EVENTS:</h1>
            {userStore.events.map((obj) => {
                return (
                    <div>
                        <h1>Event: {obj.event}</h1>
                        <h1>Group: {obj.group_name}</h1>
                        <h1>Description: {obj.description}</h1>
                        <h1>Starts At: {obj.starts_at}</h1>
                    </div>
                );
            })}
            {children}
        </div>
    );
}
