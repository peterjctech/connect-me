import { ImHome } from "react-icons/im";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/router";

export default function () {
    const router = useRouter();

    return (
        <nav className="navbar">
            <div className="navbar__icons">
                <ImHome onClick={() => router.push("/")} className="navbar__icon" />
                <IoMdNotifications className="navbar__icon" />
                <FaSearch className="navbar__icon" />
                <BsFillChatDotsFill className="navbar__icon" />
                <FaUser onClick={() => router.push("/auth")} className="navbar__icon" />
            </div>
        </nav>
    );
}
