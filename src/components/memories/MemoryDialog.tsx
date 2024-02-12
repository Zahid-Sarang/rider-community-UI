import { useQuery } from "@tanstack/react-query";
import { HeartHandshake, MessageCircleMore, X } from "lucide-react";
import { getMemoryAPi } from "../../http/api";
import Spinner from "../loading/Spinner";
import profilePlaceHolder from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";

interface Props {
    memoryId: number;
    closeMemoryDialog: () => void;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    profilePhoto: string;
    coverPhoto: string;
    bio: string;
    location: string;
    bikeDetails: string;
}

interface Comment {
    text: string;
    id: number;
    user: User;
}

const MemoryDialog = ({ memoryId, closeMemoryDialog }: Props) => {
    const { user } = useAuthStore();
    const {
        data: memoryData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["memoryDialog"],
        queryFn: async () => {
            return await getMemoryAPi(memoryId);
        },
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        console.log("Error While Fetching");
    }
    console.log(memoryData?.data);
    const memoryInfo = memoryData!.data;

    const onCloseClick = () => {
        closeMemoryDialog();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-75 lg:p-20 max-lg:!items-start">
            <div className="relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center max-w-screen-xl w-full lg:h-[80vh]">
                {/* Memory Image */}
                <div className="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">
                    {memoryInfo.image ? (
                        <div className="relative z-10 w-full h-full">
                            <img
                                src={memoryInfo.image}
                                alt="Memory"
                                className="object-cover w-full h-full "
                            />
                        </div>
                    ) : (
                        <h1 className="text-xl font-extrabold text-primary">No Image</h1>
                    )}
                    <button
                        onClick={onCloseClick}
                        className="absolute top-0 right-0 z-10 p-2 m-3 rounded-full uk-animation-slide-right-medium bg-follow-btn uk-modal-close"
                    >
                        <X color="white" />
                    </button>
                </div>
                {/* Right Sidebar */}
                <div className="relative flex flex-col justify-between w-full h-full overflow-y-auto shadow-xl md:w-1/2 2xl:w-[75%] bg-sidebar-bg">
                    <div className="p-5 pb-0">
                        {/* Heading */}
                        <div className="flex gap-3 text-sm font-medium">
                            <img
                                src={memoryInfo.user.profilePhoto || profilePlaceHolder}
                                className="object-cover rounded-full w-9 h-9"
                                alt="User Profile"
                            />
                            <div className="flex-1">
                                <h4 className="font-bold text-primary">
                                    {memoryInfo.user.firstName} {memoryInfo.user.lastName}
                                </h4>
                                <div className="text-xs font-medium text-secondary">
                                    {memoryInfo.title}
                                </div>
                            </div>
                        </div>
                        {/* Memory Description */}
                        <p className="mt-4 text-sm font-normal leading-6 text-secondary">
                            {memoryInfo.description}
                        </p>
                        {/* Likes and Comments */}
                        <div className="relative px-5 py-3 mt-3 -mx-5 shadow">
                            <div className="flex items-center gap-4 text-xs font-semibold">
                                <div className="flex items-center justify-between gap-7">
                                    {/* Likes */}
                                    <div className="flex items-center justify-center gap-2">
                                        <HeartHandshake color="#DB2677" />
                                        <p className="text-primary">{memoryInfo.likes.length}</p>
                                    </div>
                                    {/* Comments */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <MessageCircleMore color="white" />
                                            <p className="text-primary">
                                                {memoryInfo.comments.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Comments */}
                        <div className="flex-1 h-full p-5 overflow-y-auto">
                            <div className="relative space-y-5 text-sm font-medium">
                                {memoryInfo.comments.map((comment: Comment, index: number) => (
                                    <div key={index} className="relative flex items-start gap-3">
                                        <img
                                            src={comment.user.profilePhoto || profilePlaceHolder}
                                            className="object-cover w-6 h-6 mt-1 rounded-full"
                                            alt="Commenter Profile"
                                        />
                                        <div className="flex-1">
                                            <Link
                                                to={`/profile/${comment.user.id}`}
                                                className="font-bold text-primary"
                                            >
                                                {comment.user.firstName} {comment.user.lastName}
                                            </Link>
                                            <p className="mt-0.5 text-secondary">{comment.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Add Comment */}
                    <div className="flex items-center gap-2 p-3 text-sm font-medium ">
                        <img
                            src={user?.profilePhoto || profilePlaceHolder}
                            className="w-6 h-6 rounded-full"
                            alt="User Profile"
                        />
                        <div className="relative flex-1 h-10 overflow-hidden">
                            <textarea
                                placeholder="Add Comments..."
                                rows={1}
                                className="w-full text-sm text-primary border-none resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="text-sm text-primary rounded-full py-1.5 px-3.5 bg-follow-btn"
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemoryDialog;
