import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Image, TentTree } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ItineraryGrids from "../../components/itineraries/ItineraryGrids";
import Spinner from "../../components/loading/Spinner";
import MemoriesGrid from "../../components/memories/MemoriesGrid";
import MemoryDialog from "../../components/memories/MemoryDialog";
import { ITINERARIES, MEMORIES } from "../../constants/constVariable";
import { getItineraries, getMemories } from "../../http/api";
const Explore = () => {
    const [current, setCurrent] = useState(MEMORIES);
    const [memoryId, setMemoryId] = useState<number | null>();
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, isPending } = useQuery({
        queryKey: ["getMemories"],
        queryFn: async () => {
            const res = await getMemories();
            return res.data;
        },
    });

    const { data: ItineraryData, isPending: ItinerayrPending } = useQuery({
        queryKey: ["getItineraries"],
        queryFn: async () => {
            const res = await getItineraries();
            return res.data;
        },
    });

    if (isPending || ItinerayrPending) {
        return <Spinner />;
    }
    console.log(data);

    const { data: memories } = data;

    const { data: itinerary } = ItineraryData;

    const handleMemoryId = (id: number) => {
        setMemoryId(id);
        setDialogOpen(true);
    };

    const closeMemoryDialog = () => {
        setMemoryId(null);
        setDialogOpen(false);
    };

    return (
        <>
            <div className="py-6 mt-6 mb-3">
                <Link
                    to="/"
                    className="mb-3 inline-flex items-center gap-1.5 text-sm leading-5 font-semibold text-blue-500"
                >
                    <span>
                        <ArrowLeft />
                    </span>
                    Back
                </Link>
                <h1 className="text-3xl font-extrabold text-primary">Explore</h1>
            </div>

            <div className="flex pb-5 border-b justify-evenly border-slate-700">
                <div className="flex gap-3 cursor-pointer" onClick={() => setCurrent(MEMORIES)}>
                    <Image
                        className={`${current === MEMORIES ? "text-blue-500" : "text-secondary"}`}
                    />
                    <h1
                        className={`text-xl font-bold ${
                            current === MEMORIES ? "text-blue-500" : "text-secondary"
                        }`}
                    >
                        Memories
                    </h1>
                </div>
                <div className="flex gap-3 cursor-pointer" onClick={() => setCurrent(ITINERARIES)}>
                    <TentTree
                        className={`${
                            current === ITINERARIES ? "text-blue-500" : "text-secondary"
                        }`}
                    />
                    <h1
                        className={`text-xl font-bold ${
                            current === ITINERARIES ? "text-blue-500" : "text-secondary"
                        }`}
                    >
                        Itineraries
                    </h1>
                </div>
            </div>

            {current === MEMORIES && (
                <>
                    <MemoriesGrid
                        memories={memories}
                        handleMemoryId={handleMemoryId}
                        hideTitle={true}
                    />
                </>
            )}
            {dialogOpen && memoryId && (
                <MemoryDialog closeMemoryDialog={closeMemoryDialog} memoryId={memoryId} />
            )}

            {current === ITINERARIES && (
                <>
                    <ItineraryGrids itineraries={itinerary} />
                </>
            )}
        </>
    );
};

export default Explore;
