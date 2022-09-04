import { AiFillStar, AiFillCalendar, AiOutlineSearch, AiFillHome } from "react-icons/ai";
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { useRouter } from "next/router";

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
        { route: "/interests", text: "Add Interests", component: AiFillStar, class: null },
    ];

    return (
        <nav className="navbar">
            {routes.map((obj) => {
                return (
                    <div
                        onClick={obj.route ? () => router.push(obj.route) : () => search()}
                        className={`hover-change ${obj.class}`}
                        key={obj.route}
                    >
                        <obj.component />
                        <h4>{obj.text}</h4>
                    </div>
                );
            })}
        </nav>
    );
};

export default Navbar;
