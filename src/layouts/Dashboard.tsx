import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const Home = () => {
    const { user } = useAuthStore();
    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Home;
