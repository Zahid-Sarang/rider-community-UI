import { useParams } from "react-router-dom";

const UsersProfile = () => {
    const { id } = useParams();

    return <h1>Users</h1>;
};

export default UsersProfile;
