import MemoriesGrid from "../../components/memories/MemoriesGrid";
import ContentSwitch from "../../components/profile/ContentSwitch";
import ProfileSection from "../../components/profile/ProfileSection";
import { useAuthStore } from "../../store";

const Profile = () => {
    const { user } = useAuthStore();

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
            <ContentSwitch />
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
            <div className="mt-8">
                <MemoriesGrid />
            </div>
        </>
    );
};

export default Profile;
