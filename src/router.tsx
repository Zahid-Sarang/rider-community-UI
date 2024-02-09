import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";

import Root from "./layouts/Root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import ProfilePage from "./pages/profile/Profile";
import RegisterPage from "./pages/register/Register";
import UpdateProfilePage from "./pages/profile/UpdateProfile";
import ItineraryPage from "./pages/itinerary/Itinerary";
import ExplorePage from "./pages/explore/Explore";
import UsersProfile from "./pages/profile/UsersProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Dashboard />,
                children: [
                    {
                        path: "",
                        element: <HomePage />,
                    },
                    {
                        path: "/profile",
                        element: <ProfilePage />,
                    },
                    {
                        path: "/update-profile",
                        element: <UpdateProfilePage />,
                    },
                    {
                        path: "/profile/:id",
                        element: <UsersProfile />,
                    },
                    {
                        path: "/create-itineraries",
                        element: <ItineraryPage />,
                    },
                    {
                        path: "/explore",
                        element: <ExplorePage />,
                    },
                ],
            },
            {
                path: "/auth",
                element: <NonAuth />,
                children: [
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                    {
                        path: "register",
                        element: <RegisterPage />,
                    },
                ],
            },
        ],
    },
]);
