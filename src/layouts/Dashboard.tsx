import { Navigate, Outlet } from "react-router-dom";
import Logo from "../components/icons/Logo";
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
                <div className="mx-auto max-w-[935px] py-10 px-5">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Home;
