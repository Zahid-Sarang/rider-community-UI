import { CameraIcon, TentTree } from "lucide-react";
import { ITINERARIES, MEMORIES } from "../../constants/constVariable";

interface Content {
    content: string;
    handleContent: (contentData: string) => void;
}

const ContentSwitch = ({ handleContent, content }: Content) => {
    return (
        <>
            <div className="pb-3 mt-10 border-b border-slate-700">
                <nav className="flex text-sm font-semibold text-secondary">
                    <ul className="flex gap-10 mx-auto justify-evenly">
                        <li>
                            <button
                                onClick={() => handleContent(MEMORIES)}
                                className="flex gap-2"
                                style={{
                                    color: content === MEMORIES ? "#DB2677" : "#ffffffb2",
                                }}
                            >
                                <span>
                                    <CameraIcon />
                                </span>
                                Memories
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleContent(ITINERARIES)}
                                className="flex gap-2"
                                style={{
                                    color: content === ITINERARIES ? "#DB2677" : "#ffffffb2",
                                }}
                            >
                                <span>
                                    <TentTree />
                                </span>
                                Itineraries
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default ContentSwitch;
