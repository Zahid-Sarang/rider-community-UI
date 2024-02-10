import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // Assuming password might be optional
    userName: string;
    profilePhoto: string;
    coverPhoto: string;
    bio: string;
    location: string;
    bikeDetails: string;
    // Add other properties if needed
}

interface SearchUserData {
    total: number;
    data: User[];
}

const UserSearch = ({ usersData }: { usersData: SearchUserData }) => {
    const { user } = useAuthStore();

    return (
        <div>
            {usersData.data.map((userInfo) => (
                <div key={userInfo.id} className="animate-fade-in">
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
                            <div className="text-sm font-bold mt-0.5 text-follow-btn">
                                {user &&
                                user.following.find((item: User) => item.id === userInfo.id)
                                    ? `Followed By you`
                                    : `${user!.bio}`}
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default UserSearch;
