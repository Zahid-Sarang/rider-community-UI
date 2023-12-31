import { Camera, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import profilePlaceHolder from "../../assets/profile.jpg";
import { useAuthStore } from "../../store";

const Profile = () => {
    const { user } = useAuthStore();
    console.log(user?.profilePhoto);
    return (
        <>
            {/* profile info */}
            <div className="relative py-6">
                <div className="flex gap-4 md:gap-16 max-md:flex-col">
                    <div className="relative h-full duration-500 rounded-full shadow-md md:p-1 max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 hover:scale-110 uk-animation-scale-up">
                        <div className="relative md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
                            {/* profile image */}
                            <img
                                src={user?.profilePhoto || profilePlaceHolder}
                                alt="Profile Image"
                                className="absolute object-cover w-full h-full"
                            />
                        </div>
                        <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex hidden">
                            <span className="text-sidebar-bg">
                                <Camera />
                            </span>
                        </button>
                    </div>
                    <div className="flex-1 max-w-2x">
                        <h3 className="text-base font-semibold text-primary md:text-xl">
                            {user?.firstName} {user?.lastName}
                        </h3>
                        <p className="mt-1 text-xs font-normal text-blue-600 sm:text-sm">
                            @{user?.userName}
                        </p>
                        <p className="mt-2 text-sm font-light md:font-normal text-primary">
                            {user?.bio}
                        </p>
                        <div className="flex justify-between gap-4 mt-4 md:items-end md:mt-8 max-md:flex-col">
                            <div className="flex gap-6 text-xs sm:gap-10 sm:text-sm max-sm:absolute max-sm:top-10 max-sm:left-36">
                                {/* followers count */}
                                <div>
                                    <p className="text-primary">Posts</p>
                                    <h3 className="mt-1 text-base font-normal sm:text-xl sm:font-bold text-primary">
                                        102
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-primary">Buddies</p>
                                    <h3 className="mt-1 text-base font-normal sm:text-xl sm:font-bold text-primary">
                                        103
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <button
                                    type="submit"
                                    className="text-secondary-btn bg-pink-100 border border-pink-200 rounded-md p-2 pt-2.5 pb-2.5 pl-4 pr-4 text-xs leading-5 font-semibold"
                                >
                                    Add Friend
                                </button>
                                <button className="text-white bg-secondary-btn rounded-md p-2 pt-2.5 pb-2.5 pl-4 pr-4 text-xs leading-5 font-semibold">
                                    Message
                                </button>
                                <div>
                                    <Link
                                        to="/update-profile"
                                        className="rounded-lg bg-slate-200/60 flex px-2 py-1.5 bg-slate-700"
                                    >
                                        <span className="text-primary">
                                            <Settings />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  post section */}
            <div className="mt-10"></div>
        </>
    );
};

export default Profile;
