import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMemories } from "../../http/api";
import Spinner from "../loading/Spinner";
import MemoriesGrid from "../memories/MemoriesGrid";
import MemoryDialog from "../memories/MemoryDialog";
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
    const [memoryDialog, setMemoryDialog] = useState(false);
    const [memoryId, setMemoryId] = useState<number>();
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

    const { data: searchMemoriesData, total } = memoriesData;

    const memories: Memories[] = searchMemoriesData.map((memory: any) => ({
        id: memory.id,
        title: memory.title,
        description: memory.description,
        image: memory.image,
    }));

    const handleMemoryId = (id: number) => {
        setMemoryId(id);
        setMemoryDialog(true);
    };
    const closeMemoryDialog = () => {
        setMemoryDialog(false);
    };

    return (
        <>
            <div>
                {<MemoriesGrid memories={memories} total={total} handleMemoryId={handleMemoryId} />}
            </div>
            {memoryDialog && memoryId && (
                <MemoryDialog closeMemoryDialog={closeMemoryDialog} memoryId={memoryId} />
            )}
        </>
    );
};

export default MemorySearch;
