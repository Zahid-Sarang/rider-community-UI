import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/loading/Spinner";
import { getSelf } from "../constants";
import { useAuthStore } from "../store";

const Root = () => {
    const { setUser } = useAuthStore();

    const { data, isLoading } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        retry: (failureCount: number, error) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
                return false;
            }
            return failureCount < 3;
        },
    });

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data, setUser]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-auto mx-auto my-20">
                <div className="flex items-center justify-center gap-3 text-white">
                    <p>Server take minimum 50s to start please wait </p>
                    <Spinner />
                </div>
            </div>
        );
    }
    return <Outlet />;
};

export default Root;
