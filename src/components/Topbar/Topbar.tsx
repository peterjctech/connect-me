import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AiFillBell, AiOutlineSearch } from "react-icons/ai";
import { IoMailSharp } from "react-icons/io5";

import { useForm } from "@hooks";
import { Input } from "@common";
import { StoreInterface } from "@types";

const Topbar = () => {
    const router = useRouter();
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { formData, handleChange } = useForm({
        search: "",
    });

    return (
        <div className="topbar">
            <h1 onClick={() => router.push("/feed")}>CM</h1>
            <Input
                name="search"
                value={formData.search}
                handleChange={handleChange}
                icon={{ SVG: <AiOutlineSearch />, position: "left" }}
                placeholder="Search"
                noLabel
            />
            <section>
                <div>
                    <AiFillBell />
                </div>
                <div>
                    <IoMailSharp />
                </div>
                <img
                    src={userStore.profile_picture ? userStore.profile_picture : "/profile-picture.jpg"}
                    onClick={() => router.push("/dashboard")}
                    className="profile-picture-sm"
                />
            </section>
        </div>
    );
};

export default Topbar;
