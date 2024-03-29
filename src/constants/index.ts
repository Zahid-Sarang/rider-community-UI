// self endpoint apui call
import { selfApi } from "../http/api";
export const getSelf = async () => {
    const { data } = await selfApi();
    return data;
};

// Navbar Links
import { Home, Search, RadioTower, PlusCircle, CircleUserRound } from "lucide-react";

export const NavLinks = [
    {
        url: "/",
        Icon: Home,
        title: "Home",
    },
    {
        url: "/search",
        Icon: Search,
        title: "Search",
    },
    {
        url: "/explore",
        Icon: RadioTower,
        title: "Explore",
    },
    {
        url: "/create-itineraries",
        Icon: PlusCircle,
        title: "Create Itinerary",
    },
    {
        url: "/profile",
        Icon: CircleUserRound,
        title: "Profile",
    },
];
