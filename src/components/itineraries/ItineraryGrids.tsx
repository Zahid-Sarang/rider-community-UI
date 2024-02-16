import { motion } from "framer-motion";
import { TentTree } from "lucide-react";
import { Link } from "react-router-dom";
import PalceHolder from "../loading/PalceHolder";

interface Itinerary {
    id: number;
    tripTitle: string;
    tripDescription: string;
    startPoint: string;
    endingPoint: string;
    tripDuration: string;
    startDateTime: string;
    endDateTime: string;
    destinationImage: string;
}

interface Props {
    itineraries: Itinerary[];
    total?: number;
}

const ItineraryGrids = ({ itineraries, total }: Props) => {
    return (
        <>
            {itineraries.length > 0 ? (
                <div className="flex items-center justify-between py-3">
                    <div className="flex items-center justify-between py-3">
                        <h1 className="text-xl font-bold text-primary">Itineraries</h1>
                        {total && <h2 className="text-secondary">{total} result</h2>}
                    </div>
                </div>
            ) : (
                <PalceHolder Icon={TentTree} heading="Memories" infoText="memories" />
            )}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {itineraries.map((itinerary: Itinerary) => (
                    <Link to={`/itinerary/${itinerary.id}`} key={itinerary.id}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="overflow-hidden rounded-lg shadow-md bg-sidebar-bg"
                        >
                            <img
                                className="object-cover w-full h-48"
                                src={itinerary.destinationImage}
                                alt={itinerary.tripTitle}
                            />
                            <div className="p-4">
                                <h3 className="mb-2 text-lg font-bold text-primary">
                                    {itinerary.tripTitle}
                                </h3>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-secondary">Description</p>
                                    <p className="text-sm font-semibold text-primary">
                                        {itinerary.tripDescription}
                                    </p>
                                </div>
                                <div className="flex flex-col mt-4">
                                    <div className="flex items-center justify-between gap-5">
                                        <p className="text-sm text-secondary">Start Point:</p>
                                        <p className="text-sm font-semibold text-primary">
                                            {itinerary.startPoint}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-5 mt-2">
                                        <p className="text-sm text-secondary">Ending Point:</p>
                                        <p className="text-sm font-semibold text-primary">
                                            {itinerary.endingPoint}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-5 mt-2">
                                        <p className="text-sm text-secondary">Duration:</p>
                                        <p className="text-sm font-semibold text-primary">
                                            {itinerary.tripDuration}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default ItineraryGrids;
