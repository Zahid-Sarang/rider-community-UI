import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/loading/Spinner";
import { getItineraryAPi, joinItinerary } from "../../http/api";
import { useAuthStore } from "../../store";
import { User } from "../../types";

const SingleItinerary = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const { user } = useAuthStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["singleItinerary"],
        queryFn: async () => {
            const res = await getItineraryAPi(Number(id));
            return res.data;
        },
    });

    // joinItinerary Api call
    const { mutate } = useMutation({
        mutationKey: ["joinItinerary"],
        mutationFn: joinItinerary,
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ["singleItinerary"] });
        },
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        toast.error("Error fetching itinerary data"); // Display error toast
        return <div className="text-red-600">Error fetching itinerary data</div>;
    }

    const {
        id: itineraryId,
        tripTitle,
        tripDescription,
        tripDuration,
        startPoint,
        endingPoint,
        startDateTime,
        endDateTime,
        destinationImage,
        joinedUsers,
        user: organizer,
    } = data;

    // formate Date and Time
    const formateDateAndTime = (dateAndTime: Date) => {
        const dateTime = new Date(dateAndTime);
        console.log(dateTime);
        // Format Date
        const optionsDate = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        } as Intl.DateTimeFormatOptions;
        const optionsTime = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        } as Intl.DateTimeFormatOptions;
        const time = dateTime.toLocaleTimeString("en-US", optionsTime);

        const date = dateTime.toLocaleDateString("en-US", optionsDate);
        return { date, time };
    };

    const { date: startDate, time: startTime } = formateDateAndTime(startDateTime);
    const { date: endDate, time: endTime } = formateDateAndTime(endDateTime);

    const handleJoinItinerary = async () => {
        const userId = user!.id;
        await mutate({ userId, itineraryId });
    };

    return (
        <>
            <div className="container p-4 rounded-lg bg-sidebar-bg">
                <div className="max-w-4xl ">
                    {/* Itinerary Image */}
                    <div className="mb-8">
                        <img
                            src={destinationImage}
                            alt="Destination"
                            className="w-full h-full rounded-lg shadow-lg"
                            // style={{ maxWidth: "400px", maxHeight: "300px" }}
                        />
                    </div>

                    {/* admin */}
                    <div className="flex">
                        <div className="pr-2">
                            <div className="flex items-center justify-between gap-10 pb-2 border-b border-slate-700">
                                <div className="flex items-center mb-2 ">
                                    <img
                                        src={organizer.profilePhoto}
                                        alt="Organizer"
                                        className="object-cover w-10 h-10 mr-2 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold text-primary">
                                            {organizer.firstName} {organizer.lastName}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <p className="text-secondary">{organizer.location}</p>
                                            <p className="text-sm font-bold text-green-500">
                                                Admin
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleJoinItinerary}
                                    className="text-white bg-secondary-btn rounded-md p-2 pt-2.5 pb-2.5 pl-4 pr-4 text-sm leading-5 font-semibold"
                                >
                                    Join Itinerary
                                </button>
                            </div>
                            {/* Itinerary Info */}
                            <div className="mt-3 border-b border-slate-700">
                                <h1 className="mb-2 text-3xl font-bold text-primary">
                                    {tripTitle}
                                </h1>
                                <p className="my-4 text-secondary">{tripDescription}</p>
                                <div className="flex items-center justify-between pb-2">
                                    <h4 className="text-base font-bold text-primary">
                                        ⏳ {tripDuration} Trip
                                    </h4>
                                </div>
                            </div>
                            {/* Itinerary Info Date and Time*/}
                            <div className="mt-3 mb-4 lg:w-full lg:pr-4 lg:mb-0">
                                <div className="flex justify-between">
                                    <div className="flex items-center mb-2 text-gray-600">
                                        <span className="mr-2 text-primary">Start Point:</span>
                                        <span className="text-secondary">{startPoint}</span>
                                    </div>
                                    <div className="flex items-center mb-2 text-gray-600">
                                        <span className="mr-2 text-primary">Ending Point:</span>
                                        <span className="text-secondary">{endingPoint}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center mb-2 text-gray-600">
                                        <span className="mr-2 text-primary">Start Date:</span>
                                        <span className="text-secondary">{startDate}</span>
                                    </div>
                                    <div className="flex items-center mb-2 text-gray-600">
                                        <span className="mr-2 text-primary">End Date:</span>
                                        <span className="text-secondary">{endDate}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center mb-2 text-gray-600">
                                        <span className="mr-2 text-primary">Start Time:</span>
                                        <span className="text-secondary">{startTime}</span>
                                    </div>
                                    <div className="flex items-center mb-2 text-gray-600">
                                        <span className="mr-2 text-primary">End Time:</span>
                                        <span className="text-secondary">{endTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Joined Users */}
                        <div className="border-l lg:w-1/2 lg:pl-4 border-slate-700">
                            <h2 className="mb-4 text-base font-semibold text-secondary">
                                {`Total ${joinedUsers.length} Members`}
                            </h2>

                            {joinedUsers.map((user: User) => (
                                <div className="flex items-center gap-4 mt-4">
                                    <Link to={`/profile/${user.id}`}>
                                        <img
                                            src={user.profilePhoto}
                                            alt={user.userName}
                                            className="w-10 h-10 bg-gray-200 rounded-full"
                                        />
                                    </Link>
                                    <div className="flex-1">
                                        <Link
                                            to={`/profile/${user.id}`}
                                            className="text-xs font-medium text-white"
                                        >
                                            {user.firstName} {user.lastName}
                                        </Link>
                                        <div className="mt-0.5 text-secondary text-xs">
                                            {user.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleItinerary;
