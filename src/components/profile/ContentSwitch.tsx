import { CameraIcon, PlaneIcon } from "lucide-react";
import { ITINERARIES, MEMORIES } from "../../constants/constVariable";

interface Content {
    content: string;
    handleContent: (contentData: string) => void;
}

const ContentSwitch = ({ handleContent, content }: Content) => {
    return (
        <>
            <div className="mt-10">
                <nav className="flex text-sm font-semibold text-secondary">
                    <ul className="flex gap-10 mx-auto justify-evenly">
                        <li>
                            <button
                                onClick={() => handleContent(MEMORIES)}
                                className="flex gap-2"
                                style={{
                                    color: content === "memories" ? "#DB2677" : "#ffffffb2",
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
                                    color: content === "itineraries" ? "#DB2677" : "#ffffffb2",
                                }}
                            >
                                <span>
                                    <PlaneIcon />
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
