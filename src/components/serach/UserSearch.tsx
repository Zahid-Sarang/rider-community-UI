interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // Assuming password might be optional
    userName: string;
    profilePhoto: string;
    coverPhoto: string;
    bio: string;
    location: string;
    bikeDetails: string;
    // Add other properties if needed
}

interface SearchUserData {
    total: number;
    data: User[];
}

const UserSearch = ({ usersData }: { usersData: SearchUserData }) => {
    // Destructure `data` from props and rename it to `users`
    return (
        <div>
            <p>Users Data</p>
            {usersData.data.map((user) => (
                <div key={user.id}>
                    <p>
                        {user.firstName} {user.lastName}
                    </p>
                    <p>Email: {user.email}</p>
                    {/* Add more user details here */}
                </div>
            ))}
        </div>
    );
};

export default UserSearch;
