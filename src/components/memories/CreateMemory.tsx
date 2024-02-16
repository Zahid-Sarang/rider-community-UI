import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Image, Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { memoryApi } from "../../http/api";
import { useAuthStore } from "../../store";
import { MemoryData } from "../../types";
import Spinner from "../loading/Spinner";

interface CreateMemory {
    handleMemoryDialog: () => void;
}

const CreateMemory = ({ handleMemoryDialog }: CreateMemory) => {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm<MemoryData>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            const fileList = new DataTransfer();
            fileList.items.add(file);
            setValue("image", fileList.files);
        }
    };

    const onCancelClick = () => {
        setPreviewImage(null);
        clearErrors();
        reset();
        handleMemoryDialog();
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ["memory"],
        mutationFn: memoryApi,
        onSuccess: async ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ["memories"] });
            toast.success(data.message || "Memory created successfully");
            onCancelClick();
        },
        onError: (error) => {
            toast.error(`API Error: ${error.message}`, {
                toastId: "apiError1",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
    });

    const onSubmit: SubmitHandler<MemoryData> = (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("userId", user!.id.toString());
            if (data.image && data.image[0]) {
                // Ensure that there is an image file before appending it to the form data
                const file = data.image[0];
                formData.append("image", file); // Append the image file to the form data
            }
            mutate(formData as unknown as MemoryData);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 "
                onClick={onCancelClick}
            >
                {isPending ? (
                    <Spinner />
                ) : (
                    <div
                        className="w-full p-8 rounded-xl bg-sidebar-bg md:w-[520px] text-primary relative "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="absolute top-2 right-2" onClick={onCancelClick}>
                            <X />
                        </button>
                        <div className="flex justify-center py-3 mb-0 text-center border-b -m-7 border-slate-700">
                            <h2 className="text-sm font-medium">Create Memory</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <div className="space-y-5 mt-7">
                                <div>
                                    <label className="text-base">Memory Title</label>
                                    <input
                                        placeholder="title"
                                        type="text"
                                        className="w-full mt-3 border-0 rounded-md shadow-sm bg-[#344155] text-primary"
                                        {...register("title", {
                                            required: "Please Enter title",
                                        })}
                                    />
                                    {errors.title && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-base">Memory Description</label>
                                    <textarea
                                        className="w-full mt-3 border-0 rounded-md shadow-sm resize-none bg-[#344155] text-primary"
                                        placeholder="share your memory"
                                        rows={4}
                                        {...register("description", {
                                            required: "Please Enter Description",
                                        })}
                                    ></textarea>
                                    {errors.description && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.description?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <div className="w-full border-[0.5px] border-follow-btn h-72 relative border1 rounded-lg overflow-hidden bg-[url('https://demo.foxthemes.net/instello/assets/images/ad_pattern.png')] bg-repeat">
                                        <label className="absolute bottom-0 z-10 flex flex-col items-center justify-center w-full pt-10 pb-6 -translate-x-1/2 cursor-pointer left-1/2 bg-gradient-to-t from-gray-700/60">
                                            <input
                                                type="file"
                                                className="hidden"
                                                {...register("image")}
                                                onChange={handleImageChange}
                                            />
                                            {previewImage && (
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-full h-full mt-2 rounded-md"
                                                /> // Display the preview image
                                            )}
                                            <Image color="#0084C7" />
                                            <span className="mt-2 text-white">
                                                Snapshot of Memory
                                            </span>
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
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreateMemory;
