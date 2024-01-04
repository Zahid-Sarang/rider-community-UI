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
            <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
                <div className="max-w-2xl pt-10 pb-10 pl-4 pr-4 mx-auto">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Home;
