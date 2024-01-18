import { Heart, MessageCircleMore, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface Memories {
    title: string;
    description: string;
    image?: string;
    firstName: string;
    lastName: string;
    profilePhoto?: string;
}

const Card = ({ title, description, image, profilePhoto, firstName, lastName }: Memories) => {
    return (
        <>
            <div className="text-sm font-medium shadow-sm bg-sidebar-bg rounded-xl border1 ">
                {/* heading */}
                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                    <Link to="/">
                        <img
                            src={profilePhoto}
                            alt="memory image"
                            className="rounded-full w-9 h-9"
                        />
                    </Link>
                    <div className="flex-1">
                        <Link to="/">
                            <h4 className=" text-primary">
                                {firstName} {lastName}
                            </h4>
                        </Link>
                        <div className="text-xs text-gray-500 dark:text-white/80">{title}</div>
                    </div>
                    <div className="-mr-1">
                        <MoreHorizontal color="#fff" />
                    </div>
                </div>
                {/* image */}
                <div className="relative w-full h-full lg:h-72 sm:px-4">
                    <img
                        src={image}
                        alt="Memory-Image"
                        className="object-cover w-full h-full sm:rounded-lg"
                    />
                </div>
                {/* Likes and commenst icons */}
                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                    <div className="flex items-center gap-2.5 text-primary">
                        <span>
                            <Heart />{" "}
                        </span>
                        <span>102</span>
                    </div>
                    <div className="flex items-center gap-3 text-primary">
                        <span>
                            <MessageCircleMore />
                        </span>
                        <span>260</span>
                    </div>
                </div>
                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                    <div className="sm:p-4 p-2.5 flex items-center gap-4 text-sm font-semibold text-primary">
                        <p className="mt-0.5">{description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
