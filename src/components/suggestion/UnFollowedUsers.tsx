import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { USER_PER_PAGE } from "../../constants/constVariable";
import { unFollowedUser } from "../../http/api";
import { useAuthStore } from "../../store";
import { User } from "../../types";
import Spinner from "../loading/Spinner";
import UserSuggestion from "./UserSuggestion";

const UnFollowedUsers = () => {
    const { user } = useAuthStore();
    const [queryParams, setQueryParams] = useState({
        perPage: USER_PER_PAGE,
        currentPage: 1,
    });

    // api call
    const { data: unfollowed, isPending: unFollowedPending } = useQuery({
        queryKey: ["unFollowed", queryParams],
        queryFn: async () => {
            if (user?.id) {
                const filterParams = Object.fromEntries(
                    Object.entries(queryParams).filter((item) => !!item[1]),
                );
                const queryString = new URLSearchParams(
                    filterParams as unknown as Record<string, string>,
                ).toString();
                const res = await unFollowedUser(user?.id, queryString);
                return res.data;
            }
        },
    });

    if (unFollowedPending) {
        return <Spinner />;
    }

    const { data: unFollowedUsersData, total } = unfollowed;
    // pagination
    const handlePagination = () => {
        setQueryParams((prev) => ({
            ...prev,
            currentPage:
                unFollowedUsersData?.length === queryParams.perPage ? prev.currentPage + 1 : 1,
        }));
    };
    return (
        <>
            {/* user Sugesstion  */}
            <div className="p-5 px-6 shadow-sm bg-sidebar-bg rounded-xl ">
                <div className="flex justify-between text-primary">
                    <h1 className="text-base font-bold">People You Might Know</h1>
                    {total > USER_PER_PAGE && (
                        <button type="button" onClick={handlePagination}>
                            <RefreshCcw />
                        </button>
                    )}
                </div>
                {unFollowedUsersData &&
                    unFollowedUsersData.map((users: User) => (
                        <UserSuggestion
                            key={users.id}
                            profile={users.profilePhoto}
                            firstName={users.firstName}
                            userName={users.userName}
                            lastName={users.lastName}
                            targetUserId={users.id}
                        />
                    ))}
            </div>
        </>
    );
};

export default UnFollowedUsers;
