import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import Sidebar from "./sidebar/Sidebar";

const Home = () => {
    const { user } = useAuthStore();
    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }
    return (
        <>
            <Sidebar />
            <main className="2xl:ml-[290px] xl:ml-[240px] md:ml-[73px]">
                <div className="pt-10 pb-10 pl-4 pr-4 mx-auto max-w-[935px]">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Home;
