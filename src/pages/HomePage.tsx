import { useQuery } from "@tanstack/react-query";
import { Image, RefreshCcw } from "lucide-react";
import { UnfollowedData } from "../types";
import Card from "../components/memories/Card";
import UserSuggestion from "../components/suggestion/UserSuggestion";
import { unFollowedUser, usersMemories } from "../http/api";
import { useAuthStore } from "../store";
import { useState } from "react";
import CreateMemory from "../components/memories/CreateMemory";

interface Memory {
    id: number;
    title: string;
    description: string;
    image: string;
    user: {
        id: number;
        profilePhoto: string;
        firstName: string;
        lastName: string;
    };
    likes: any[];
}

function HomePage() {
    const { user } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);

    const { data: unFollowedUsersData } = useQuery({
        queryKey: ["unFollowed"],
        queryFn: () => {
            if (user?.id) {
                return unFollowedUser(user?.id).then((res) => res.data);
            }
        },
    });

    // fetch users memories
    const { data: memoriesData } = useQuery({
        queryKey: ["memories"],
        queryFn: () => {
            if (user?.id) {
                return usersMemories(user.id).then((res) => res.data);
            }
        },
    });
    const handleMemoryDialogBox = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div className="flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10">
                <div className="md:max-w-[510px] mx-auto flex-1 xl:space-y-6 space-y-3">
                    {/* create memories */}
                    <div className="p-4 space-y-4 text-sm font-medium shadow-sm rounded-xl border1 bg-sidebar-bg">
                        <div className="flex items-center gap-3">
                            <div className="flex-1 transition-all rounded-lg cursor-pointer hover:bg-opacity-80 bg-[#344155]">
                                <div className="py-2.5 text-center text-white">
                                    <button onClick={() => setIsOpen(true)}>
                                        Share your Ride Memories!
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="p-2 transition-all rounded-lg cursor-pointer bg-sky-100 hover:bg-opacity-80"
                            >
                                <Image color="#0084C7" />
                            </button>
                        </div>
                    </div>

                    {/* Memories */}
                    {memoriesData &&
                        memoriesData.map((memory: Memory, index: number) => (
                            <div
                                key={index}
                                className="text-sm font-medium shadow-sm bg-sidebar-bg rounded-xl border1"
                            >
                                <Card
                                    id={memory.id}
                                    title={memory.title}
                                    description={memory.description}
                                    image={memory.image}
                                    profilePhoto={memory.user.profilePhoto}
                                    firstName={memory.user.firstName}
                                    lastName={memory.user.lastName}
                                    likes={memory.likes}
                                    userId={memory.user.id}
                                />
                            </div>
                        ))}
                </div>
                {/* right sidebar */}
                <div className="mx-auto w-96 ">
                    <div className="space-y-3 xl:space-y-6 md:pb-12">
                        {/* user Sugesstion  */}

                        <div className="p-5 px-6 shadow-sm bg-sidebar-bg rounded-xl ">
                            <div className="flex justify-between text-primary">
                                <h1 className="text-base font-bold">People You Might Know</h1>
                                <button type="button">
                                    <RefreshCcw />
                                </button>
                            </div>
                            {unFollowedUsersData &&
                                unFollowedUsersData.map((users: UnfollowedData) => (
                                    <UserSuggestion
                                        key={users.id}
                                        profile={users.profilePhoto}
                                        firstName={users.firstName}
                                        userName={users.userName}
                                        lastName={users.lastName}
                                        targetUserId={users.id}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <CreateMemory handleMemoryDialog={handleMemoryDialogBox} />}
        </>
    );
}

export default HomePage;
