import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import Sidebar from "./sidebar/Sidebar";

const Home = () => {
    const { user } = useAuthStore();
    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Home;
