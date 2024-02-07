import { CameraIcon, PlaneIcon } from "lucide-react";
import { useState } from "react";
const ContentSwitch = () => {
    const [content, setContent] = useState<string>("memories");
    return (
        <>
            <div className="mt-10">
                <nav className="flex text-sm font-semibold text-secondary">
                    <ul className="flex gap-10 mx-auto justify-evenly">
                        <li>
                            <button
                                onClick={() => setContent("memories")}
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
                                onClick={() => setContent("itineraries")}
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
