import { useQuery } from "@tanstack/react-query";
import { getItineraries } from "../../http/api";
import ItineraryGrids from "../itineraries/ItineraryGrids";
import Spinner from "../loading/Spinner";
import PalceHolder from "../loading/PalceHolder";
import { TentTree } from "lucide-react";

type QueryParams = {
    queryParams: { q?: string };
    searchTerm: string;
};

const ItinerarySearch = ({ queryParams, searchTerm }: QueryParams) => {
    const { data: itinerariesData, isFetching } = useQuery({
        queryKey: ["SearchItineraries", queryParams],
        queryFn: async () => {
            const queryString = Object.entries(queryParams)
                .map(
                    ([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
                )
                .join("&");
            const res = await getItineraries(queryString);
            return res.data;
        },
        enabled: !!searchTerm,
    });

    if (isFetching) {
        return (
            <div className="flex items-start justify-center mt-10">
                <Spinner />
            </div>
        );
    }

    if (!itinerariesData) {
        return <PalceHolder Icon={TentTree} heading="Itineraries" infoText="itineraries" />;
    }

    const { data: searchedItinerariesData, total } = itinerariesData;
    return (
        <>
            <ItineraryGrids itineraries={searchedItinerariesData} total={total} />
        </>
    );
};

export default ItinerarySearch;
