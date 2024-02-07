import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/loading/Spinner";
import MemoriesGrid from "../../components/memories/MemoriesGrid";
import ContentSwitch from "../../components/profile/ContentSwitch";
import ProfileSection from "../../components/profile/ProfileSection";
import { MEMORIES } from "../../constants/constVariable";
import { getUserInfo } from "../../http/api";
import { useAuthStore } from "../../store";

const UsersProfile = () => {
    const [content, setContent] = useState<string>(MEMORIES);
    const { user } = useAuthStore();
    const { id } = useParams();

    const handleChangeContent = (contentData: string) => {
        setContent(contentData);
    };

    if (user?.id === Number(id)) {
        console.log(user.id === Number(id));
        return <Navigate to="/profile" replace={true} />;
    }

    const {
        data: userInfo,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["usersInfo"],
        queryFn: async () => {
            const res = await getUserInfo(Number(id));
            return res.data;
        },
    });
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        toast.error("Error fetching user data"); // Display error toast
        return (
            <>
                <div>Error fetching user data</div>
            </>
        );
    }

    if (!userInfo) {
        return null; // or handle appropriately
    }

    return (
        <>
            <ProfileSection
                profilePhoto={userInfo.profilePhoto}
                firstName={userInfo.firstName}
                lastName={userInfo.lastName}
                userName={userInfo.userName}
                bio={userInfo!.bio}
                bikeDetails={user!.bikeDetails}
                location={userInfo!.location}
                MemoriesCount={user!.memories.length}
                FollowersCount={user!.followers.length}
                FollowingCount={userInfo!.following.length}
                canUpdate={false}
            />
            <ContentSwitch handleContent={handleChangeContent} content={content} />

            {/* Memories */}
            <div className="mt-8">
                <MemoriesGrid memories={userInfo.memories} />
            </div>
        </>
    );
};

export default UsersProfile;
