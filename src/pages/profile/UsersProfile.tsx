import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ItineraryGrids from "../../components/itineraries/ItineraryGrids";
import Spinner from "../../components/loading/Spinner";
import MemoriesGrid from "../../components/memories/MemoriesGrid";
import MemoryDialog from "../../components/memories/MemoryDialog";
import ContentSwitch from "../../components/profile/ContentSwitch";
import ProfileSection from "../../components/profile/ProfileSection";
import { ITINERARIES, MEMORIES } from "../../constants/constVariable";
import { getUserInfo } from "../../http/api";
import { useAuthStore } from "../../store";

const UsersProfile = () => {
    const [content, setContent] = useState<string>(MEMORIES);
    const [memoryDialog, setMemoryDialog] = useState(false);
    const [memoryId, setMemoryId] = useState<number>();
    const { user } = useAuthStore();
    const { id } = useParams();

    const handleChangeContent = (contentData: string) => {
        setContent(contentData);
    };
    const {
        data: userInfo,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["usersInfo"],
        queryFn: async () => {
            const res = await getUserInfo(Number(id));
            return res.data;
        },
    });

    if (user?.id === Number(id)) {
        console.log(user.id === Number(id));
        return <Navigate to="/profile" replace={true} />;
    }

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

    const handleMemoryId = (id: number) => {
        setMemoryId(id);
        setMemoryDialog(true);
    };
    const closeMemoryDialog = () => {
        setMemoryDialog(false);
    };

    const canUpdate = user!.id === Number(id);

    return (
        <>
            <ProfileSection
                id={Number(id)}
                profilePhoto={userInfo.profilePhoto}
                firstName={userInfo.firstName}
                lastName={userInfo.lastName}
                userName={userInfo.userName}
                bio={userInfo!.bio}
                bikeDetails={userInfo!.bikeDetails}
                location={userInfo!.location}
                MemoriesCount={userInfo!.memories.length}
                FollowersCount={userInfo!.followers.length}
                FollowingCount={userInfo!.following.length}
                canUpdate={canUpdate}
            />
            <ContentSwitch handleContent={handleChangeContent} content={content} />

            {/* Memories */}
            {content === MEMORIES && (
                <div className="mt-8">
                    <MemoriesGrid memories={userInfo.memories} handleMemoryId={handleMemoryId} />
                </div>
            )}

            {memoryDialog && memoryId && (
                <MemoryDialog closeMemoryDialog={closeMemoryDialog} memoryId={memoryId} />
            )}

            {/* Itineraries */}
            {content === ITINERARIES && <ItineraryGrids itineraries={userInfo!.itineraries} />}
        </>
    );
};

export default UsersProfile;
