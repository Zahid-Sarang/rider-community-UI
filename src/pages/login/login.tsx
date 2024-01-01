import Logo from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Credentials } from "../../types";
import { loginApi } from "../../http/api";
import { getSelf } from "../../constants";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";

const loginUser = async (credentials: Credentials) => {
    const { data } = await loginApi(credentials);
    console.log("data", data);
    return data;
};

const LoginPage = () => {
    const { setUser } = useAuthStore();
    const { refetch } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        enabled: false,
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ["login"],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            setUser(selfDataPromise.data);
        },
    });
    return (
        <>
            <div className="flex items-center justify-center min-h-screen flex-col gap-4">
                <Logo />
                <div className="bg-sidebar-bg shadow-md rounded-xl p-8 max-w-md w-full">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 bg-follow-btn text-primary shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    />
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
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="w-full px-3 py-2 leading-tight rounded shadow appearance-none bg-follow-btn text-primary focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>
                            <div className="text-sm">
                                <Link
                                    to="/auth/login"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-secondary-btn px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:text-secondary-btn shadow-sm hover:bg-primary-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-btn"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/auth/register"
                                className="font-semibold leading-6 text-secondary-btn hover:text-primary-btn"
                            >
                                Register Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
