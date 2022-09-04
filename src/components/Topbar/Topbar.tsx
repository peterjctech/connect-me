import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { testColor, testTheme } from "@store";
import { useForm } from "@hooks";
import { Input } from "@common";
import { StoreInterface } from "@types";

import { BsFillPaletteFill } from "react-icons/bs";
import { AiFillBell, AiOutlineSearch } from "react-icons/ai";
import { IoMailSharp } from "react-icons/io5";
import { BiColorFill } from "react-icons/bi";

const Topbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { formData, handleChange } = useForm({
        search: "",
    });

    return (
        <div className="topbar">
            <h1>CM</h1>
            <Input
                name="search"
                value={formData.search}
                handleChange={handleChange}
                icon={<AiOutlineSearch />}
                placeholder="Search"
                noLabel
            />
            <section>
                <div onClick={() => dispatch(testTheme())}>
                    <BsFillPaletteFill />
                </div>
                <div onClick={() => dispatch(testColor())}>
                    <BiColorFill />
                </div>
                <div>
                    <AiFillBell />
                </div>
                <div>
                    <IoMailSharp />
                </div>
                <img
                    src={userStore.profile_picture || "/profile-picture.jpg"}
                    onClick={() => router.push("/dashboard")}
                    className="profile-picture-sm"
                />
            </section>
        </div>
    );
};

export default Topbar;
