import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import ContentSwitch from "../../components/profile/ContentSwitch";
import ProfileSection from "../../components/profile/ProfileSection";
import { getUserInfo } from "../../http/api";
import { useAuthStore } from "../../store";

const UsersProfile = () => {
    const { user } = useAuthStore();
    const { id } = useParams();

    if (user?.id === Number(id)) {
        console.log(user.id === Number(id));
        return <Navigate to="/profile" replace={true} />;
    }

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
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching user data</div>;
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
            <ContentSwitch />
        </>
    );
};

export default UsersProfile;
