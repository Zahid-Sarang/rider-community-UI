import { ArrowLeft, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";
import profilePlaceHolder from "../../assets/profile.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserData } from "../../types";
import { updateUserApi } from "../../http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSelf } from "../../constants";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const { user, setUser } = useAuthStore();
    const { register, handleSubmit, reset } = useForm();

    const { refetch } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        enabled: false,
    });

    const updateUser = async (updateDate: UpdateUserData) => {
        const { data } = await updateUserApi(user?.id, updateDate);
        return data;
    };

    const { mutate, error } = useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: updateUser,
        onSuccess: async (data) => {
            const selfDataPromise = await refetch();
            setUser(selfDataPromise.data);
            toast.success(data.message || "Profile Updated!");
        },
    });

    const onSubmit: SubmitHandler<UpdateUserData> = async (data) => {
        console.log(data);
        const formData = new FormData();
        if (data.userName) {
            formData.append("userName", data.userName);
        }
        formData.append("firstName", data.firstName || user?.firstName || "");
        formData.append("lastName", data.lastName || user?.lastName || "");
        formData.append("location", data.location || user?.location || "");
        formData.append("bio", data.bio || user?.bio || "");
        formData.append("bikeDetails", data.bikeDetails || user?.bikeDetails || "");

        if (data.profilePhoto && data.profilePhoto.length > 0) {
            formData.append("profilePhoto", data.profilePhoto[0]);
        } 

        if (data.coverPhoto && data.coverPhoto.length > 0) {
            formData.append("coverPhoto", data.coverPhoto[0]);
        }

        console.log(formData);
        mutate(formData);
        reset();
    };

    if (error) {
        toast.error(`API Error: ${error.message}`, {
            toastId: "apiError1",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

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
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" autoComplete="off">
                <div className="border shadow-sm bg-sidebar-bg rounded-xl border-follow-btn">
                    <div className="flex items-center gap-4 p-6 md:gap-8 md:p-10">
                        <div className="relative w-12 h-12 md:w-20 md:h-20 shrink-0">
                            <label className="cursor-pointer">
                                <img
                                    src={user?.profilePhoto || profilePlaceHolder}
                                    alt="profile-Image"
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </label>
                            <label className="md:p-1 p-0.5 rounded-full bg-follow-btn md:border-4  absolute -bottom-2 -right-2 cursor-pointer border-follow-btn">
                                <span className="text-primary">
                                    <Camera />
                                </span>
                                <input
                                    type="file"
                                    id="file"
                                    className="hidden"
                                    {...register("profilePhoto")}
                                />
                            </label>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-primary md:text-xl">
                                {user?.firstName} {user?.lastName}
                            </h3>
                            <p className="mt-1 text-sm font-normal text-blue-600">
                                @{user?.userName}
                            </p>
                        </div>
                    </div>
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
                                        {...register("userName")}
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
                                        {...register("firstName")}
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
                                        {...register("lastName")}
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
                                        {...register("location")}
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
                                        {...register("bio")}
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
                                        {...register("bikeDetails")}
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
                                        {...register("coverPhoto")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-16">
                            <button
                                onClick={() => reset()}
                                className="py-2 text-sm font-semibold leading-5 rounded-md text-primary button lg:px-6 bg-follow-btn max-md:flex-1"
                            >
                                Cancle
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-semibold leading-5 rounded-md text-primary button lg:px-10 bg-secondary-btn max-md:flex-1"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default UpdateProfile;
