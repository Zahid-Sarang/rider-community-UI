import { useState } from "react";
import MemoriesGrid from "../../components/memories/MemoriesGrid";
import ContentSwitch from "../../components/profile/ContentSwitch";
import ProfileSection from "../../components/profile/ProfileSection";
import { ITINERARIES, MEMORIES } from "../../constants/constVariable";
import { useAuthStore } from "../../store";

const Profile = () => {
    const [content, setContent] = useState<string>(MEMORIES);
    const { user } = useAuthStore();

    const handleChangeContent = (contentData: string) => {
        setContent(contentData);
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
                    <MemoriesGrid memories={user?.memories || []} />
                </div>
            )}

            {/* Itineraries */}
            {content === ITINERARIES && <h1>Ititneraries</h1>}
        </>
    );
};

export default Profile;
