import { useQuery } from "@tanstack/react-query";
import { getItineraries } from "../../http/api";
import ItineraryGrids from "../itineraries/ItineraryGrids";
import Spinner from "../loading/Spinner";

type QueryParams = {
    queryParams: { q?: string };
    searchTerm: string;
};

const ItinerarySearch = ({ queryParams, searchTerm }: QueryParams) => {
    const { data: itinerariesData, isPending } = useQuery({
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

    if (isPending) {
        return (
            <div className="flex items-start justify-center mt-10">
                <Spinner />
            </div>
        );
    }

    const { data: searchedItinerariesData, total } = itinerariesData;
    return (
        <>
            <ItineraryGrids itineraries={searchedItinerariesData} total={total} />
        </>
    );
};

export default ItinerarySearch;
