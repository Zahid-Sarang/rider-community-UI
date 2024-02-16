import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { followUsers, unFollowUsers } from "../../http/api";
import { useAuthStore } from "../../store";

interface Suggestions {
    profile: string;
    userName: string;
    firstName: string;
    lastName: string;
    targetUserId: number;
}

const UserSuggestion = ({ profile, userName, firstName, lastName, targetUserId }: Suggestions) => {
    const [followState, setFollowState] = useState("Follow");
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const { mutate: followMutate, } = useMutation({
        mutationKey: ["follow"],
        mutationFn: followUsers,
        onSuccess: async () => {
            setFollowState("UnFollow");
            queryClient.invalidateQueries({ queryKey: ["memories"] });
            queryClient.invalidateQueries({ queryKey: ["self"] });
            return;
        },
    });

    const { mutate: unFollowMutate } = useMutation({
        mutationKey: ["unFollow"],
        mutationFn: unFollowUsers,
        onSuccess: async () => {
            setFollowState("Follow");
            queryClient.invalidateQueries({ queryKey: ["memories"] });
            queryClient.invalidateQueries({ queryKey: ["self"] });
            return;
        },
    });
    const handleFollowAndUnFollow = () => {
        const followerId = user!.id;
        const followedId = targetUserId;
        if (followState === "Follow") {
            return followMutate({ followerId, followedId });
        } else {
            return unFollowMutate({ followerId, followedId });
        }
    };
    return (
        <div className="flex items-center gap-3 mt-4">
            <Link to={`/profile/${targetUserId}`}>
                <img
                    src={profile}
                    alt={userName}
                    className="object-cover w-10 h-10 bg-gray-200 rounded-full"
                />
            </Link>
            <div className="flex-1">
                <Link to={`/profile/${targetUserId}`} className="text-sm font-semibold text-white">
                    {firstName} {lastName}
                </Link>
                <div className="mt-0.5 text-secondary">Suggested For You</div>
            </div>
            <button
                onClick={handleFollowAndUnFollow}
                className="text-sm text-primary rounded-full py-1.5 cursor-pointer px-4 font-semibold bg-follow-btn"
            >
                {followState}
            </button>
        </div>
    );
};

export default UserSuggestion;
