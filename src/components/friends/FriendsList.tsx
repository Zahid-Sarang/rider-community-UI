import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAuthStore } from "../../store";
import { User } from "../../types";
import { UserRoundPlus } from "lucide-react";

const FriendsList = () => {
    const { user } = useAuthStore();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className="p-5 px-6 shadow-sm bg-sidebar-bg rounded-xl border1">
                {user?.following && user!.following.length > 0 ? (
                    <>
                        <div className="flex justify-between text-primary">
                            <h3 className="text-base font-bold">Friends</h3>
                        </div>
                        <div className="mt-4">
                            <Slider {...settings}>
                                {user!.following.map((following: User) => (
                                    <div key={following.id}>
                                        <Link to={`/profile/${following.id}`}>
                                            <div className="relative w-12 h-12">
                                                <img
                                                    src={following.profilePhoto}
                                                    alt={following.userName}
                                                    className="absolute inset-0 object-cover w-full h-full rounded-full"
                                                />
                                                <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2"></div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <UserRoundPlus
                                size={36}
                                color="white"
                                className="border rounded-[50%] p-1"
                            />
                            <p className="text-lg font-bold text-primary">People you follow</p>
                        </div>
                        <p className="mt-2 text-secondary">
                            Once you follow people, you'll see them here
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default FriendsList;
