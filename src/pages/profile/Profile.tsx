import { BikeIcon, Camera, CameraIcon, MapPin, PlaneIcon, Settings } from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import profilePlaceHolder from "../../assets/profile.jpg";
import MemoriesGrid from "../../components/memories/MemoriesGrid";
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
            {/*  toggel */}
            <div className="mt-10">
                <nav className="flex text-sm font-semibold text-secondary">
                    <ul className="flex gap-10 mx-auto justify-evenly">
                        <li>
                            <NavLink
                                to="/profile"
                                className="flex gap-2"
                                style={{
                                    color:
                                        window.location.pathname === "/profile"
                                            ? "#DB2677"
                                            : "#ffffffb2",
                                }}
                            >
                                <span>
                                    <CameraIcon />
                                </span>
                                Memories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile/itineraries"
                                className="flex gap-2"
                                style={{
                                    color:
                                        window.location.pathname === "/profile/itineraries"
                                            ? "#DB2677"
                                            : "#ffffffb2",
                                }}
                            >
                                <span>
                                    <PlaneIcon />
                                </span>
                                Itineraries
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

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
