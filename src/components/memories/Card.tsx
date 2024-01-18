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
                <div className="sm:p-4 p-2.5 border-t  font-normal space-y-3 relative border-slate-700/40">
                    <div className="sm:p-4 p-2.5 flex items-center gap-4 text-sm font-semibold text-primary">
                        <p className="mt-0.5">{description}</p>
                    </div>
                </div>
                <div className="sm:px-4 sm:py-3 p-2.5 border-t  flex items-center gap-1 border-slate-700/40">
                    <img src={profilePhoto} alt="active-user" className="w-6 h-6 rounded-full" />
                    <div className="relative flex-1 h-10 overflow-hidden">
                        <textarea
                            placeholder="Add Comments..."
                            rows={1}
                            className="w-full text-primary border-none resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-sm text-primary rounded-full py-1.5 px-3.5 bg-follow-btn"
                    >
                        Replay
                    </button>
                </div>
            </div>
        </>
    );
};

export default Card;
