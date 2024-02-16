import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAuthStore } from "../../store";
import { User } from "../../types";

const FriendsList = () => {
    const { user } = useAuthStore();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    // Get the first 6 following users if there are more than 6
    // const followingUsers = user!.following.slice(0, 6);

    return (
        <>
            <div className="p-5 px-6 shadow-sm bg-sidebar-bg rounded-xl border1 ">
                <div className="flex justify-between text-primary">
                    <h3 className="text-base font-bold">Friends</h3>
                </div>
                <div className="mt-4">
                    {
                        <Slider {...settings}>
                            {user!.following.map((following: User, index) => (
                                <>
                                    <div key={index}>
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
                                </>
                            ))}
                        </Slider>
                    }
                </div>
            </div>
        </>
    );
};

export default FriendsList;
