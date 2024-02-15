import Logo from "../../components/icons/Logo";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterData } from "../../types";
import { registerApi } from "../../http/api";
import { getSelf } from "../../constants";
import { useAuthStore } from "../../store";

const registerUser = async (registerData: RegisterData) => {
    const { data } = await registerApi(registerData);
    return data;
};

const Register = () => {
    const { setUser } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterData>();

    const { refetch } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        enabled: false,
    });

    const { mutate, isError, error } = useMutation({
        mutationKey: ["register"],
        mutationFn: registerUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            setUser(selfDataPromise.data);
        },
    });

    const onSubmit: SubmitHandler<RegisterData> = (data) => {
        console.log(data);
        mutate(data);
        reset();
    };

    if (isError) {
        console.log(error);
        toast.error("Failed to Register try again!", {
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
        <div>
            <>
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <Logo />
                    <div className="w-full max-w-md p-8 shadow-md bg-sidebar-bg rounded-xl">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("firstName", {
                                                required: "FirstName is required",
                                            })}
                                            placeholder="First Name"
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 bg-follow-btn text-primary shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        />
                                        {errors.firstName && (
                                            <p className="text-secondary-btn" role="alert">
                                                {errors.firstName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("lastName", {
                                                required: "Last Name is required",
                                            })}
                                            placeholder="Last Name"
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 bg-follow-btn text-primary shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        />
                                        {errors.lastName && (
                                            <p className="text-secondary-btn" role="alert">
                                                {errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="userName"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        User Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("userName", {
                                                required: "User Name is required",
                                            })}
                                            placeholder="User Name"
                                            id="userName"
                                            name="userName"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 bg-follow-btn text-primary shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        />
                                        {errors.userName && (
                                            <p className="text-secondary-btn" role="alert">
                                                {errors.userName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                            })}
                                            placeholder="Email"
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 bg-follow-btn text-primary shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        />
                                        {errors.email && (
                                            <p className="text-secondary-btn" role="alert">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Password must be at least 8 characters long",
                                                },
                                            })}
                                            id="password"
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            className="block w-full rounded-md border-0 py-1.5 bg-follow-btn text-primary shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        />
                                        {errors.password && (
                                            <p role="alert" className="text-secondary-btn">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-secondary-btn px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:text-secondary-btn shadow-sm hover:bg-primary-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-btn"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-sm text-center text-gray-500">
                                Already have an account?{" "}
                                <NavLink
                                    to="/auth/login"
                                    className="font-semibold leading-6 text-secondary-btn hover:text-primary-btn"
                                >
                                    Log In here
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Register;
