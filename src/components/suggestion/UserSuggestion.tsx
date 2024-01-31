import { Link } from "react-router-dom";

interface Suggestions {
    profile: string;
    userName: string;
    firstName: string;
    lastName: string;
    targetUserId: number;
}

const UserSuggestion = ({ profile, userName, firstName, lastName, targetUserId }: Suggestions) => {
    return (
        <div className="flex items-center gap-3 mt-4">
            <Link to="/">
                <img src={profile} alt={userName} className="w-10 h-10 bg-gray-200 rounded-full" />
            </Link>
            <div className="flex-1">
                <Link to="/" className="text-sm font-semibold text-white">
                    {firstName} {lastName}
                </Link>
                <div className="mt-0.5 text-secondary">Suggested For You</div>
            </div>
            <button className="text-sm text-primary rounded-full py-1.5 cursor-pointer px-4 font-semibold bg-follow-btn">
                Follow
            </button>
        </div>
    );
};

export default UserSuggestion;
