import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Profile from "../../pages/profile/Profile";
import { useAuthStore } from "../../store";

const MemoriesGrid = () => {
    const { user } = useAuthStore();
    console.log(user);
    return (
        <>
            {/* <Profile> */}
            <div className="flex items-center justify-between py-3">
                <h1 className="text-xl font-bold text-primary">Memories</h1>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6 lg:grid-cols-4 sm:grid-cols-3">
                {user?.memories.map((memory) => (
                    <Link to={`/memories/${memory.id}`}>
                        <div className="duration-500 delay-100 lg:hover:scale-105 hover:shadow-lg hover:z-10">
                            <div className="relative overflow-hidden rounded-lg uk-transition-toggle">
                                <div className="relative w-full lg:h-60 h-full aspect-[3/3]">
                                    <img
                                        src={memory.image}
                                        alt={memory.title}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-white/5 hover:backdrop-blur-sm ">
                                    <div className="flex items-center justify-center w-full h-full gap-4 text-white">
                                        <div className="flex items-center gap-2">
                                            <Heart
                                                className="invisible text-2xl md hover:visible"
                                                role="img"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {/* </Profile> */}
        </>
    );
};

export default MemoriesGrid;
