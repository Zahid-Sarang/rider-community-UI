import { Bike } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../components/icons/Logo";
import { logoutApi } from "../../http/api";

const Sidebar = () => {
    const logout = async () => {
        await logoutApi();
    };
    return (
        <>
            <div className="fixed top-0 left-0 z-40 max-md:top-auto max-md:bottom-0">
                <div className="flex sside md:flex-col justify-between md:h-screen md:p-2 p-1 transition-all duration-500 bg-sidebar-bg shadow dark:bg-dark2 2xl:w-72 xl:w-60 max-xl:w-[73px] max-md:w-screen max-md:border-t max-md:dark:border-slate-700">
                    {/* Logo */}
                    <div className="flex h-20 px-2 max-md:fixed max-md:top-0 max-md:w-full max-md:bg-white/80 max-md:left-0 max-md:px-4 max-md:h-14 max-md:shadow-sm max-md:dark:bg-slate-900/80 backdrop-blur-xl">
                        <Link to="/" className="flex items-center gap-3">
                            {/* mobile logo */}
                            <span className="md:w-8 hidden text-2xl max-xl:!block max-md:!hidden shrink-0 uk-animation-scale-up text-secondary-btn ">
                                <Bike />
                            </span>

                            {/* desktop logo */}
                            <span className="hidden w-full h-6 xl:block">
                                <Logo />
                            </span>
                            <h2 className="font-extrabold text-primary md:hidden">BIKE BUDDIES</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
