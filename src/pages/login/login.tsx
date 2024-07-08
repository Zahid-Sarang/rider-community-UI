import Logo from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Credentials } from "../../types";
import { loginApi } from "../../http/api";
import { getSelf } from "../../constants";
import { useAuthStore } from "../../store";
import { NavLink } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

const loginUser = async (credentials: Credentials) => {
    const { data } = await loginApi(credentials);
    console.log("data", data);
    return data;
};

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Credentials>();
    const { setUser } = useAuthStore();

    const { refetch } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        enabled: false,
    });

    const { mutate, error } = useMutation({
        mutationKey: ["login"],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            setUser(selfDataPromise.data);
        },
    });

    const onSubmit: SubmitHandler<Credentials> = (data) => {
        mutate(data);
        console.log(data);
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
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Logo />
                <div className="w-full max-w-md p-8 shadow-md bg-sidebar-bg rounded-xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <p className="text-white">
                            email: <span className="text-secondary-btn">demo@hotmail.com</span>
                        </p>
                        <p className="text-white">
                            password: <span className="text-secondary-btn">password</span>
                        </p>
                        <h3 className="mt-2 text-white">
                            <span className="text-secondary-btn">Note:</span> This Project is only
                            for educational purpose
                        </h3>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("email", { required: "Email is required" })}
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
                            <div className="text-sm">
                                <NavLink
                                    to="/auth/login"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot Password?
                                </NavLink>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-secondary-btn px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:text-secondary-btn shadow-sm hover:bg-primary-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-btn"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-sm text-center text-gray-500">
                            Don't have an account?{" "}
                            <NavLink
                                to="/auth/register"
                                className="font-semibold leading-6 text-secondary-btn hover:text-primary-btn"
                            >
                                Register Here
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
