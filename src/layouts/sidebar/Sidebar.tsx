import { logoutApi } from "../../http/api";

const Sidebar = () => {
    const logout = async () => {
        await logoutApi();
    };
    return (
        <div>
            <button onClick={logout} className="text-secondary-btn">
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
