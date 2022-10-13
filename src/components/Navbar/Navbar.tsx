import { useRouter } from "next/router";
import { AiFillHome, AiFillSetting, AiFillStar, AiFillCalendar, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";

const Navbar = () => {
    const router = useRouter();

    const search = () => {
        console.log("search");
    };

    const routes = [
        { route: "/feed", text: "Home", component: AiFillHome, class: "tablet" },
        { route: "/dashboard", text: "My Profile", component: BsFillPersonFill, class: "tablet" },
        { route: "/users", text: "Find Friends", component: BsFillPeopleFill, class: null },
        { route: "/groups", text: "Find Groups", component: TiGroup, class: null },
        { route: null, text: "Search", component: AiOutlineSearch, class: "mobile" },
        { route: "/events", text: "Find Events", component: AiFillCalendar, class: null },
        { route: "/tags", text: "Find Tags", component: AiFillStar, class: null },
        { route: "/settings", text: "Settings", component: AiFillSetting, class: "tablet" },
    ];

    return (
        <nav className="navbar">
            {routes.map((route) => {
                return (
                    <div
                        onClick={route.route ? () => router.push(route.route) : () => search()}
                        key={route.route}
                        className={`hover-change ${route.class}`}
                    >
                        <route.component />
                        <h4>{route.text}</h4>
                    </div>
                );
            })}
        </nav>
    );
};

export default Navbar;
