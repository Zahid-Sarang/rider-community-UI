import { ArrowLeft, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";
import profilePlaceHolder from "../../assets/profile.jpg";
const UpdateProfile = () => {
    const { user } = useAuthStore();
    return (
        <>
            <div className="py-6 mt-6 mb-3">
                <Link
                    to="/profile"
                    className="mb-3 inline-flex items-center gap-1.5 text-sm leading-5 font-semibold text-blue-500"
                >
                    <span>
                        <ArrowLeft />
                    </span>
                    Back
                </Link>
                <h1 className="text-3xl font-extrabold text-primary">Settings</h1>
            </div>
            <div className="border shadow-sm bg-sidebar-bg border-slate-200 rounded-xl dark:border-slate-700 dark:bg-dark2">
                <div className="flex items-center gap-4 p-6 md:gap-8 md:p-10">
                    <div className="relative w-12 h-12 md:w-20 md:h-20 shrink-0">
                        <label className="cursor-pointer">
                            <img
                                src={user?.profilePhoto || profilePlaceHolder}
                                alt="profile-Image"
                                className="object-cover w-full h-full rounded-full"
                            />
                            <input type="file" id="file" className="hidden" name="profilePhoto" />
                        </label>
                        <label className="md:p-1 p-0.5 rounded-full bg-follow-btn md:border-4 border-white absolute -bottom-2 -right-2 cursor-pointer dark:border-slate-700">
                            <span className="text-primary">
                                <Camera />
                            </span>
                            <input type="file" id="file" className="hidden" name="profilePhoto" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-black md:text-xl dark:text-white">
                            {user?.firstName} {user?.lastName}
                        </h3>
                        <p className="mt-1 text-sm font-normal text-blue-600">@{user?.userName}</p>
                    </div>
                </div>
                {/* <hr className="border-t border-gray-100 dark:border-slate-700" />
                <div className="relative h-6 px-2 -mb-px"></div> */}
            </div>
            {/* update form */}
            <div className="mt-6 mb-20 text-sm font-medium text-follow-btn ">
                <div className="p-6 overflow-hidden border shadow-sm bg-sidebar-bg rounded-xl md:py-12 md:px-20 border-follow-btn ">
                    <div className="space-y-6">
                        {/* userName */}
                        <div className="items-center gap-10 md:flex">
                            <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                Username
                            </label>
                            <div className="flex-1 max-md:mt-4">
                                <input
                                    className="w-full border-0 rounded-md shadow-sm lg:w-1/2 bg-follow-btn text-primary"
                                    type="text"
                                    placeholder="username"
                                />
                            </div>
                        </div>
                        {/* firstname */}
                        <div className="items-center gap-10 md:flex">
                            <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                First name
                            </label>
                            <div className="flex-1 max-md:mt-4">
                                <input
                                    className="w-full border-0 rounded-md shadow-sm lg:w-1/2 bg-follow-btn text-primary"
                                    type="text"
                                    placeholder="first name"
                                />
                            </div>
                        </div>
                        {/* Lastname */}
                        <div className="items-center gap-10 md:flex">
                            <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                Last name
                            </label>
                            <div className="flex-1 max-md:mt-4">
                                <input
                                    className="w-full border-0 rounded-md shadow-sm lg:w-1/2 bg-follow-btn text-primary"
                                    type="text"
                                    placeholder="last name"
                                />
                            </div>
                        </div>
                        {/* location */}
                        <div className="items-center gap-10 md:flex">
                            <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                Location
                            </label>
                            <div className="flex-1 max-md:mt-4">
                                <input
                                    className="w-full border-0 rounded-md shadow-sm lg:w-1/2 bg-follow-btn text-primary"
                                    type="text"
                                    placeholder="location"
                                />
                            </div>
                        </div>
                        {/* bio */}
                        <div className="items-center gap-10 md:flex">
                            <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                Bio
                            </label>
                            <div className="flex-1 max-md:mt-4">
                                <textarea
                                    className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                    placeholder="Enter your Bio"
                                    rows={5}
                                ></textarea>
                            </div>
                        </div>
                        {/* bikeDetails */}
                        <div className="items-center gap-10 md:flex">
                            <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                Bike Model
                            </label>
                            <div className="flex-1 max-md:mt-4">
                                <input
                                    className="w-full border-0 rounded-md shadow-sm lg:w-1/2 bg-follow-btn text-primary"
                                    type="text"
                                    placeholder="bike model"
                                />
                            </div>
                        </div>

                        {/* coverImage */}
                        <div className="items-center gap-10 md:flex">
                            <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                Bike Photo
                            </label>
                            <div className="flex-1 max-md:mt-4">
                                <input
                                    className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                    type="file"
                                    name="coverPhoto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
