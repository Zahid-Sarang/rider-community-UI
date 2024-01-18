import { Image } from "lucide-react";
import Card from "../components/memories/Card";
import { useAuthStore } from "../store";

function HomePage() {
    const { user } = useAuthStore();
    return (
        <>
            <div className="flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10">
                <div className="md:max-w-[510px] mx-auto flex-1 xl:space-y-6 space-y-3">
                    {/* create memories */}
                    <div className="p-4 space-y-4 text-sm font-medium shadow-sm rounded-xl border1 bg-sidebar-bg">
                        <div className="flex items-center gap-3">
                            <div className="flex-1 transition-all rounded-lg cursor-pointer hover:bg-opacity-80 bg-[#344155]">
                                <div className="py-2.5 text-center text-white">
                                    Share your Ride Memories!
                                </div>
                            </div>
                            <div className="p-2 transition-all rounded-lg cursor-pointer bg-sky-100 hover:bg-opacity-80">
                                <Image color="#0084C7" />
                            </div>
                        </div>
                    </div>
                    {/* Memories */}
                    <div className="text-sm font-medium bg-white shadow-sm rounded-xl border1 dark:bg-dark2">
                        {user?.memories.map((memory) => (
                            <Card
                                title={memory.title}
                                description={memory.description}
                                image={memory.image}
                                profilePhoto={user.profilePhoto}
                                firstName={user.firstName}
                                lastName={user.lastName}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
