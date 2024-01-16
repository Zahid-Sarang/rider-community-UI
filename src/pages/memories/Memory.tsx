import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { memoryApi } from "../../http/api";
import { useAuthStore } from "../../store";
import { MemoryData } from "../../types";

const CreateMemory = async (memoryData: MemoryData) => {
    const { data } = await memoryApi(memoryData);
    return data;
};

const Memory = () => {
    const { user } = useAuthStore();
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<MemoryData>();

    const { mutate } = useMutation({
        mutationKey: ["memory"],
        mutationFn: CreateMemory,
        onSuccess: async (data) => {
            toast.success(data.message || "Memory created successfully");
            reset();
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
            formData.append("userId", user?.id.toString() || "");
            if (data.image && data.image.length > 0) {
                const file = data.image[0];
                if (file instanceof File) {
                    formData.append("image", file);
                } else {
                    toast.error("Invalid file format for Image");
                    return;
                }
            }
            mutate(formData);

            console.log(formData);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    const onCancelClick = () => {
        clearErrors();
        reset();
    };

    return (
        <>
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
                <h1 className="text-3xl font-extrabold text-primary">Create Memory</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {/* Memory form */}
                <div className="mt-6 mb-20 text-sm font-medium text-follow-btn ">
                    <div className="p-6 overflow-hidden border shadow-sm bg-sidebar-bg rounded-xl md:py-12 md:px-20 border-follow-btn ">
                        <div className="space-y-6">
                            {/* Memory Title */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Title
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <input
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        type="text"
                                        placeholder="title"
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
                            </div>
                            {/* Description */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Description
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <textarea
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        placeholder="Description"
                                        rows={5}
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
                            </div>

                            {/* Image */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Image
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <input
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        type="file"
                                        {...register("image", {
                                            required: "Please upload  Image!",
                                        })}
                                    />
                                    {errors.image && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.image.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-16">
                            <button
                                onClick={onCancelClick}
                                className="py-2 text-sm font-semibold leading-5 rounded-md text-primary button lg:px-6 bg-follow-btn max-md:flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-semibold leading-5 rounded-md text-primary button lg:px-10 bg-secondary-btn max-md:flex-1"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Memory;
