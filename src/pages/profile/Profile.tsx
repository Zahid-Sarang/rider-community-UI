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
            {/* <div className="flex flex-col py-3 mt-10">
                {user?.coverPhoto && (
                    <>
                        <h1 className="text-xl font-bold text-primary">Bike's</h1>
                        <div className="mt-5">
                            <img src={user?.coverPhoto} alt="Bike images" className="rounded-2xl" />
                        </div>
                    </>
                )}
            </div> */}

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
