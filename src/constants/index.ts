// self endpoint apui call
import { selfApi } from "../http/api";
export const getSelf = async () => {
    const { data } = await selfApi();
    return data;
};

// Navbar Links
import {
    Home,
    Search,
    MessageSquareText,
    RadioTower,
    BellDot,
    PlusCircle,
    CircleUserRound,
    MapPinned,
} from "lucide-react";

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
    // {
    //     url: "/message",
    //     Icon: MessageSquareText,
    //     title: "Message",
    // },
    // {
    //     url: "/notification",
    //     Icon: BellDot,
    //     title: "Notification",
    // },
    {
        url: "/create-memories",
        Icon: PlusCircle,
        title: "Create Memory ",
    },
    {
        url: "/create-itineraries",
        Icon: MapPinned,
        title: "Create Itinerary",
    },
    {
        url: "/profile",
        Icon: CircleUserRound,
        title: "Profile",
    },
];
