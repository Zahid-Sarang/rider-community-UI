import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BikeIcon, Camera, MapPin, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profilePlaceHolder from "../../assets/profile.jpg";
import { followUsers, unFollowUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import { User } from "../../types";
import Spinner from "../loading/Spinner";

interface ProfileInfo {
    id: number;
    profilePhoto?: string;
    firstName: string;
    lastName: string;
    userName: string;
    bio: string;
    bikeDetails: string;
    location: string;
    MemoriesCount: number;
    FollowersCount: number;
    FollowingCount: number;
    canUpdate: boolean;
}

const ProfileSection = ({
    profilePhoto,
    firstName,
    lastName,
    userName,
    bio,
    bikeDetails,
    location,
    MemoriesCount,
    FollowersCount,
    FollowingCount,
    canUpdate,
    id,
}: ProfileInfo) => {
    const { user } = useAuthStore();
    const [followState, setFollowState] = useState<string>();
    const queryClient = useQueryClient();
    const { mutate: followMutate, isPending: followPending } = useMutation({
        mutationKey: ["follow"],
        mutationFn: followUsers,
        onSuccess: async () => {
            setFollowState("UnFollow");
            queryClient.invalidateQueries({ queryKey: ["usersInfo"] });
            queryClient.invalidateQueries({ queryKey: ["self"] });
        },
    });

    const { mutate: unFollowMutate, isPending: unFollowPending } = useMutation({
        mutationKey: ["unFollow"],
        mutationFn: unFollowUsers,
        onSuccess: async () => {
            setFollowState("Follow");
            queryClient.invalidateQueries({ queryKey: ["usersInfo"] });
            queryClient.invalidateQueries({ queryKey: ["self"] });
        },
    });

    useEffect(() => {
        const isUserFollow = user?.following.some((followedUser: User) => followedUser.id === id);
        if (isUserFollow) {
            setFollowState("UnFollow");
        } else {
            setFollowState("Follow");
        }
    }, [user, id]);

    const handleFollowAndUnFollow = () => {
        const followerId = user!.id;
        const followedId = id;

        if (followState === "Follow") {
            followMutate({ followerId, followedId });
        } else {
            unFollowMutate({ followerId, followedId });
        }
    };

    return (
        <>
            <div className="relative py-6">
                <div className="flex gap-4 md:gap-16 max-md:flex-col">
                    <div className="relative h-full duration-500 rounded-full shadow-md md:p-1 max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 hover:scale-110 uk-animation-scale-up">
                        <div className="relative md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
                            {/* profile image */}
                            <img
                                src={profilePhoto || profilePlaceHolder}
                                alt="Profile Image"
                                className="absolute object-cover w-full h-full"
                            />
                        </div>
                        <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex hidden">
                            <span className="text-primary">
                                <Camera />
                            </span>
                        </button>
                    </div>
                    <div className="flex-1 max-w-2x">
                        <h3 className="text-base font-semibold text-primary md:text-xl">
                            {firstName} {lastName}
                        </h3>
                        <p className="mt-1 text-xs font-normal text-blue-600 sm:text-sm">
                            @{userName}
                        </p>
                        <p className="mt-2 text-sm font-light md:font-normal text-primary">{bio}</p>
                        <p className="mt-2 text-sm font-light md:font-normal text-primary">
                            <span className="flex items-center gap-2 font-bold">
                                <BikeIcon style={{ color: "#DB2677" }} />
                                {bikeDetails}
                            </span>
                        </p>
                        <p className="mt-2 text-sm font-light md:font-normal text-primary">
                            <span className="flex items-center gap-2 font-bold text-follow-btn">
                                <MapPin />
                                {location}
                            </span>
                        </p>
                        <div className="flex justify-between gap-4 mt-4 md:items-end md:mt-8 max-md:flex-col">
                            <div className="flex gap-6 text-xs sm:gap-10 sm:text-sm max-sm:absolute max-sm:top-10 max-sm:left-36">
                                {/* followers count */}
                                <div>
                                    <p className="text-primary">Memories</p>
                                    <h3 className="mt-1 text-base font-normal sm:text-xl sm:font-bold text-primary">
                                        {MemoriesCount}
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-primary">Followers</p>
                                    <h3 className="mt-1 text-base font-normal sm:text-xl sm:font-bold text-primary">
                                        {FollowersCount}
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-primary">Following</p>
                                    <h3 className="mt-1 text-base font-normal sm:text-xl sm:font-bold text-primary">
                                        {FollowingCount}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                {!canUpdate ? (
                                    <>
                                        <button
                                            className={`text-secondary-btn bg-pink-100 border border-pink-200 rounded-md p-2 pt-2.5 pb-2.5 pl-4 pr-4 text-xs leading-5 font-semibold ${
                                                followPending || unFollowPending
                                                    ? "opacity-50 pointer-events-none"
                                                    : ""
                                            }`}
                                            onClick={handleFollowAndUnFollow}
                                        >
                                            {followPending || unFollowPending ? (
                                                <Spinner />
                                            ) : followState === "Follow" ? (
                                                "Follow"
                                            ) : (
                                                "Unfollow"
                                            )}
                                        </button>

                                        <button className="text-white bg-secondary-btn rounded-md p-2 pt-2.5 pb-2.5 pl-4 pr-4 text-xs leading-5 font-semibold">
                                            Message
                                        </button>
                                    </>
                                ) : (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSection;
