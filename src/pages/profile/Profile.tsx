import { useState } from "react";
import ItineraryGrids from "../../components/itineraries/ItineraryGrids";
import MemoriesGrid from "../../components/memories/MemoriesGrid";
import MemoryDialog from "../../components/memories/MemoryDialog";
import ContentSwitch from "../../components/profile/ContentSwitch";
import ProfileSection from "../../components/profile/ProfileSection";
import { ITINERARIES, MEMORIES } from "../../constants/constVariable";
import { useAuthStore } from "../../store";

const Profile = () => {
    const [content, setContent] = useState<string>(MEMORIES);
    const [memoryDialog, setMemoryDialog] = useState(false);
    const [memoryId, setMemoryId] = useState<number>();
    const { user } = useAuthStore();

    const handleChangeContent = (contentData: string) => {
        setContent(contentData);
    };

    const handleMemoryId = (id: number) => {
        setMemoryId(id);
        setMemoryDialog(true);
    };
    const closeMemoryDialog = () => {
        setMemoryDialog(false);
    };
    return (
        <>
            {/* profile info */}
            <ProfileSection
                id={user! .id}
                profilePhoto={user?.profilePhoto}
                firstName={user!.firstName}
                lastName={user!.lastName}
                userName={user!.userName}
                bio={user!.bio}
                bikeDetails={user!.bikeDetails}
                location={user!.location}
                MemoriesCount={user!.memories.length}
                FollowersCount={user!.followers.length}
                FollowingCount={user!.following.length}
                canUpdate={true}
            />
            {/*  content switch */}
            <ContentSwitch handleContent={handleChangeContent} content={content} />
            {/* Bikes crousal */}

            {/* Memories */}
            {content === MEMORIES && (
                <div className="mt-8">
                    <MemoriesGrid memories={user?.memories || []} handleMemoryId={handleMemoryId} />
                </div>
            )}
            {memoryDialog && memoryId && (
                <MemoryDialog closeMemoryDialog={closeMemoryDialog} memoryId={memoryId} />
            )}

            {/* Itineraries */}
            {content === ITINERARIES && <ItineraryGrids itineraries={user!.itineraries} />}
        </>
    );
};

export default Profile;
