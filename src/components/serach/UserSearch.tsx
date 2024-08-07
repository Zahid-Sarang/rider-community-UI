import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import Spinner from "../loading/Spinner";
import { User } from "lucide-react";
import PalceHolder from "../loading/PalceHolder";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    profilePhoto: string;
    coverPhoto: string;
    bio: string;
    location: string;
    bikeDetails: string;
}

type QueryParams = {
    queryParams: { q?: string };
    searchTerm: string;
};

const UserSearch = ({ queryParams, searchTerm }: QueryParams) => {
    const { user } = useAuthStore();
    const { data: usersData, isFetching } = useQuery({
        queryKey: ["SearchUsers", queryParams],
        queryFn: async () => {
            const queryString = Object.entries(queryParams)
                .map(
                    ([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
                )
                .join("&");
            const res = await getUsers(queryString);
            return res.data;
        },
        enabled: !!searchTerm,
    });

    if (isFetching) {
        return (
            <div className="flex items-start justify-center mt-10">
                <Spinner />
            </div>
        );
    }
    if (!usersData) {
        return <PalceHolder Icon={User} heading="Users" infoText="users" />;
    }

    const { data: searchedUserData, total } = usersData;

    return (
        <div>
            <div className="flex items-center justify-between py-3">
                <h1 className="text-xl font-bold text-primary">Users</h1>
                <h2 className="text-secondary">{total} result</h2>
            </div>
            {searchedUserData ? (
                searchedUserData.map((userInfo: User, index: number) => (
                    <div key={index} className="animate-fade-in">
                        <Link
                            replace={true}
                            to={`/profile/${userInfo.id}`}
                            className="relative flex items-center gap-3 p-2 mt-2 duration-200 rounded-xl hover:bg-sidebar-bg"
                        >
                            <img
                                src={userInfo.profilePhoto}
                                alt={userInfo.userName}
                                className="object-cover w-16 h-16 transition duration-300 ease-in-out transform bg-gray-200 rounded-full hover:scale-110"
                                style={{ objectFit: "cover", objectPosition: "center" }}
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-base font-bold text-white">
                                    {userInfo.firstName} {userInfo.lastName}
                                </h4>
                                {user &&
                                user.following.find((item: User) => item.id === userInfo.id) ? (
                                    <div className="text-sm font-bold mt-0.5 text-follow-btn">
                                        Followed By you
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-400">{userInfo.bio}</p>
                                    </>
                                )}
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>Data Not Found</p>
            )}
        </div>
    );
};

export default UserSearch;
