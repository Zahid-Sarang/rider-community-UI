import { X, Image, Plus } from "lucide-react";

interface CreateMemory {
    handleMemoryDialog: () => void;
}

const CreateMemory = ({ handleMemoryDialog }: CreateMemory) => {
    return (
        <>
            <div
                className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 "
                onClick={() => handleMemoryDialog()}
            >
                <div
                    className="w-full p-8 rounded-xl bg-sidebar-bg md:w-[520px] text-primary relative "
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="absolute top-2 right-2" onClick={() => handleMemoryDialog()}>
                        <X />
                    </button>
                    <div className="flex justify-center py-3 mb-0 text-center border-b -m-7 border-slate-700">
                        <h2 className="text-sm font-medium">Create Memory</h2>
                    </div>
                    <form className="space-y-5 mt-7">
                        <div>
                            <label className="text-base">Memory Title</label>
                            <input
                                placeholder="title"
                                type="text"
                                className="w-full mt-3 border-0 rounded-md shadow-sm bg-[#344155] text-primary"
                            />
                        </div>
                        <div>
                            <label className="text-base">Memory Description</label>
                            <textarea
                                className="w-full mt-3 border-0 rounded-md shadow-sm resize-none bg-[#344155] text-primary"
                                placeholder="share your memory"
                                rows={4}
                            ></textarea>
                        </div>
                        <div>
                            <div className="w-full border-[0.5px] border-follow-btn h-72 relative border1 rounded-lg overflow-hidden bg-[url('https://demo.foxthemes.net/instello/assets/images/ad_pattern.png')] bg-repeat">
                                <label className="absolute bottom-0 z-10 flex flex-col items-center justify-center w-full pt-10 pb-6 -translate-x-1/2 cursor-pointer left-1/2 bg-gradient-to-t from-gray-700/60">
                                    <input type="file" className="hidden" />
                                    <Image color="#0084C7" />
                                    <span className="mt-2 text-white">Snapshot of Memory</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="flex gap-2 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-md">
                                <span>
                                    <Plus />
                                </span>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateMemory;
