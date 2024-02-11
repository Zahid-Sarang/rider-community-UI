import { debounce } from "lodash";
import { ArrowLeft, Image, Search, TentTree, User, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ItinerarySearch from "../../components/serach/ItinerarySearch";
import MemorySearch from "../../components/serach/MemorySearch";
import UserSearch from "../../components/serach/UserSearch";
import { ITINERARIES, MEMORIES, USERS } from "../../constants/constVariable";

type QueryParams = {
    q?: string;
};

const SearchPage = () => {
    const [searchIn, setSearchIn] = useState<string>(USERS);
    const [queryParams, setQueryParams] = useState<QueryParams>({});
    const [searchTerm, setSearchTerm] = useState<string>("");

    // debounce
    const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined) => {
            setSearchTerm(value ?? "");
            setQueryParams({ q: value });
        }, 500);
    }, []);

    const onFiledChange = (e: { target: { value: any } }) => {
        const searchTerm = e.target.value.trim();
        debouncedQUpdate(searchTerm);
    };

    let component;

    switch (searchIn) {
        case USERS:
            component = <UserSearch queryParams={queryParams} searchTerm={searchTerm} />;
            break;
        case MEMORIES:
            component = <MemorySearch queryParams={queryParams} searchTerm={searchTerm} />;
            break;
        case ITINERARIES:
            component = <ItinerarySearch queryParams={queryParams} searchTerm={searchTerm} />;
    }

    const clearSearchBar = () => {
        setQueryParams({ q: "" });
        setSearchTerm("");
        const inputElement = document.getElementById("searchInput") as HTMLInputElement;
        inputElement.value = "";
    };

    return (
        <>
            {/* Search Bar */}
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
                <h1 className="text-3xl font-extrabold text-primary">Search</h1>
            </div>
            <div className="relative mt-2 -mx-1">
                <div
                    className="absolute w-5 h-5 translate-y-1/2 left-3 bottom-1/2 text-primary "
                    onClick={(e) => {
                        e.preventDefault();
                        clearSearchBar();
                    }}
                >
                    {queryParams.q ? <XCircle size={20} /> : <Search size={20} />}
                </div>

                <input
                    id="searchInput"
                    onChange={onFiledChange}
                    type="text"
                    placeholder="search"
                    className="bg-sidebar-bg w-full !pl-10 !py-3 !rounded-lg text-primary border-none "
                />
            </div>
            <div className="flex justify-center pb-3 mt-10 border-b border-slate-700/40">
                <ul className="flex justify-between gap-10">
                    <li
                        className={`flex items-center justify-center gap-2 cursor-pointer ${
                            searchIn === USERS ? "text-blue-500" : "text-secondary"
                        }`}
                        onClick={() => setSearchIn(USERS)}
                    >
                        <span>
                            <User />
                        </span>
                        Users
                    </li>
                    <li
                        className={`flex items-center justify-center gap-2 cursor-pointer ${
                            searchIn === MEMORIES ? "text-blue-500" : "text-secondary"
                        }`}
                        onClick={() => setSearchIn(MEMORIES)}
                    >
                        <span>
                            <Image />
                        </span>
                        Memories
                    </li>
                    <li
                        className={`flex items-center justify-center gap-2 cursor-pointer ${
                            searchIn === ITINERARIES ? "text-blue-500" : "text-secondary"
                        }`}
                        onClick={() => setSearchIn(ITINERARIES)}
                    >
                        <span>
                            <TentTree />
                        </span>
                        Itineraries
                    </li>
                </ul>
            </div>
            {component}
        </>
    );
};

export default SearchPage;
