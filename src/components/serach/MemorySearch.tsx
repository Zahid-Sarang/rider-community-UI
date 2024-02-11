import { useQuery } from "@tanstack/react-query";
import { getMemories } from "../../http/api";
import Spinner from "../loading/Spinner";
import MemoriesGrid from "../memories/MemoriesGrid";
type QueryParams = {
    queryParams: { q?: string };
    searchTerm: string;
};

type Memories = {
    id: number;
    title: string;
    description: string;
    image: string;
};

const MemorySearch = ({ queryParams, searchTerm }: QueryParams) => {
    const { data: memoriesData, isPending } = useQuery({
        queryKey: ["SearchMemories", queryParams],
        queryFn: async () => {
            const queryString = Object.entries(queryParams)
                .map(
                    ([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
                )
                .join("&");
            const res = await getMemories(queryString);
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

    const memories: Memories[] = memoriesData.data.map((memory: any) => ({
        id: memory.id,
        title: memory.title,
        description: memory.description,
        image: memory.image,
    }));

    return (
        <>
            <div>{<MemoriesGrid memories={memories} />}</div>
        </>
    );
};

export default MemorySearch;
