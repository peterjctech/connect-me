import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AiFillBell, AiOutlineSearch, AiFillInfoCircle } from "react-icons/ai";
import { IoMailSharp } from "react-icons/io5";

import { useForm } from "hooks";
import { Input } from "common";
import { StoreInterface } from "types";

const Topbar = () => {
    const router = useRouter();
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { formData, handleChange } = useForm({
        search: "",
    });

    return (
        <div className="topbar">
            <h1 onClick={() => router.push("/info")}>
                <AiFillInfoCircle style={{ color: "white" }} />
            </h1>
            <Input
                name="search"
                value={formData.search}
                handleChange={handleChange}
                iconLeft={<AiOutlineSearch />}
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
                {userStore.profile_picture && (
                    <img
                        src={userStore.profile_picture}
                        onClick={() => router.push("/dashboard")}
                        className="img--sm"
                    />
                )}
            </section>
        </div>
    );
};

export default Topbar;
