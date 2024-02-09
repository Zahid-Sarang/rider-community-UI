import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    ChevronDown,
    Heart,
    HeartHandshake,
    MessageCircleMore,
    MoreHorizontal,
    Trash2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { addCommentsApi, addLikes, deleteCommentsApi } from "../../http/api";
import { useAuthStore } from "../../store";
import profilePlaceHolder from "../../assets/profile.jpg";

interface Memories {
    id: number;
    title: string;
    description: string;
    image?: string;
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    likes: any[];
    memoryComments: any[];
    userId: number;
}

const Card = ({
    id,
    title,
    description,
    image,
    profilePhoto,
    firstName,
    lastName,
    likes,
    memoryComments,
    userId,
}: Memories) => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const [liked, setLiked] = useState(false);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (user && likes.some((like) => like.user.id === user.id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);
    const { mutate: Likes } = useMutation({
        mutationKey: ["likes"],
        mutationFn: addLikes,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["memories"] });
            return;
        },
    });

    const { mutate: addComment } = useMutation({
        mutationKey: ["addComment"],
        mutationFn: addCommentsApi,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["memories"] });
            queryClient.invalidateQueries({ queryKey: ["self"] });
            return;
        },
    });

    const { mutate: deleteComment } = useMutation({
        mutationKey: ["deleteComment"],
        mutationFn: deleteCommentsApi,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["memories"] });
            return;
        },
    });

    const handleAddComments = async () => {
        if (commentInputRef.current?.value != null) {
            const text = commentInputRef.current?.value;
            await addComment({ text, userId: user!.id, memoryId: id });
            commentInputRef.current.value = "";
        }
        return;
    };

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleAddComments();
            }
        },
        [handleAddComments],
    );

    const handleDeleteComment = async (commentId: number) => {
        await deleteComment(commentId);
    };

    const handleAddLikes = async () => {
        const userId = user!.id;
        const memoryId = id;
        await Likes({ userId, memoryId });
    };

    console.log("memories comments", memoryComments);
    console.log(user);
    return (
        <>
            <div className="my-4 font-medium shadow-sm text5-sm bg-sidebar-bg rounded-xl border1">
                {/* heading */}
                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                    <Link to={`profile/${userId}`}>
                        <img
                            src={profilePhoto}
                            alt="memory image"
                            className="rounded-full w-9 h-9"
                        />
                    </Link>
                    <div className="flex-1">
                        <Link to={`profile/${userId}`}>
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
                {image && (
                    <div className="relative w-full h-full lg:h-72 sm:px-4">
                        <img
                            src={image}
                            alt="Memory-Image"
                            className="object-cover w-full h-full sm:rounded-lg"
                        />
                    </div>
                )}
                {/* Likes and commenst icons */}
                <div className="sm:p-4 p-2.5 border-t  font-normal space-y-3 relative border-slate-700/40">
                    <div className="sm:p-4 p-2.5 flex items-center gap-4 text-sm font-semibold text-primary">
                        <p className="mt-0.5">{description}</p>
                    </div>
                </div>
                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                    <button
                        onClick={handleAddLikes}
                        className="flex items-center gap-2.5 text-primary"
                    >
                        <span>{liked ? <HeartHandshake color="#DB2677" /> : <Heart />} </span>
                        <span>{likes.length}</span>
                    </button>
                    <div className="flex items-center gap-3 text-primary">
                        <span>
                            <MessageCircleMore />
                        </span>
                        <span>{memoryComments.length}</span>
                    </div>
                </div>
                {memoryComments && (
                    <div className="sm:p-4 p-2.5 border-t font-normal space-y-3 relative border-slate-700/40">
                        {memoryComments.slice(-3).map((comment, index) => (
                            <div key={index} className="relative flex items-start gap-3">
                                <Link to={`profile/${comment.user.id}`}>
                                    <img
                                        src={
                                            comment.user.profilePhoto
                                                ? comment.user.profilePhoto
                                                : profilePlaceHolder
                                        }
                                        alt="userProfile"
                                        className="object-cover w-6 h-6 mt-1 rounded-full"
                                    />
                                </Link>
                                <div className="flex-1">
                                    <Link
                                        to={`profile/${comment.user.id}`}
                                        className="inline-block text-xs font-bold text-primary"
                                    >
                                        {comment.user.firstName} {comment.user.lastName}
                                    </Link>
                                    <div className="flex justify-between">
                                        <p className="mt-0.5 text-primary">{comment.text}</p>
                                        {user &&
                                            user.comments &&
                                            user.comments.find(
                                                (item) => item.id === comment.id,
                                            ) && (
                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="text-sm text-secondary "
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {memoryComments.length > 3 && (
                            <Link
                                to={`memory/${id}`}
                                className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2 "
                            >
                                <ChevronDown />
                                More Comment
                            </Link>
                        )}
                    </div>
                )}

                <div className="sm:px-4 sm:py-3 p-2.5 border-t  flex items-center gap-2 border-slate-700/40">
                    <img
                        src={user!.profilePhoto}
                        alt="active-user"
                        className="w-6 h-6 rounded-full"
                    />
                    <div className="relative flex-1 h-10 overflow-hidden">
                        <textarea
                            onKeyDown={handleKeyDown}
                            ref={commentInputRef}
                            placeholder="Add Comments..."
                            rows={1}
                            className="w-full text-sm text-primary border-none resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                        ></textarea>
                    </div>
                    <button
                        onClick={handleAddComments}
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
