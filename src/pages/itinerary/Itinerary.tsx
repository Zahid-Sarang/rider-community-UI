import { ArrowLeft, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ItineraryData } from "../../types";

const Itinerary = () => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<ItineraryData>();

    const onSubmit: SubmitHandler<ItineraryData> = (data) => {
        const formData = new FormData();

        console.log(formData);
        reset();
    };

    const onCancelClick = () => {
        // Clear all validation errors
        clearErrors();
        // Reset the form
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
                <h1 className="text-3xl font-extrabold text-primary">Create Itinerary</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {/* itinerary form */}
                <div className="mt-6 mb-20 text-sm font-medium text-follow-btn ">
                    <div className="p-6 overflow-hidden border shadow-sm bg-sidebar-bg rounded-xl md:py-12 md:px-20 border-follow-btn ">
                        <div className="space-y-6">
                            {/* TripTitle */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Trip Title
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <input
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        type="text"
                                        placeholder="tripTitle"
                                        {...register("tripTitle", {
                                            required: "Please Enter TripTitle",
                                        })}
                                    />
                                    {errors.tripTitle && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.tripTitle.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* tripDescription */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Trip Description
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <input
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        type="text"
                                        placeholder="tripDescription"
                                        {...register("tripDescription", {
                                            required: "Please Enter tripDescription",
                                        })}
                                    />
                                    {errors.tripDescription && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.tripDescription?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* tripDuration */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Trip Duration
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <input
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        type="text"
                                        placeholder="tripDuration"
                                        {...register("tripDuration", {
                                            required: "Please Enter tripDuration",
                                        })}
                                    />
                                    {errors.tripDuration && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.tripDuration?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* startDateTime */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    StartDate & Time
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <Controller
                                        name="startDateTime"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                showIcon
                                                selected={
                                                    field.value ? new Date(field.value) : null
                                                }
                                                onChange={(date) => field.onChange(date)}
                                                icon={
                                                    <Calendar
                                                        strokeWidth={3}
                                                        absoluteStrokeWidth
                                                        className="items-center text-base text-secondary-btn"
                                                    />
                                                }
                                                selectsStart
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                startDate={
                                                    field.value ? new Date(field.value) : null
                                                }
                                                className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                            />
                                        )}
                                        rules={{ required: "Please Enter startDateTime" }}
                                    />

                                    {errors.startDateTime && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.startDateTime?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* endDateTime */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    EndDate & Time
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <Controller
                                        name="endDateTime"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                showIcon
                                                selected={
                                                    field.value ? new Date(field.value) : null
                                                }
                                                onChange={(date) => field.onChange(date)}
                                                icon={
                                                    <Calendar
                                                        strokeWidth={3}
                                                        absoluteStrokeWidth
                                                        className="items-center text-base text-secondary-btn"
                                                    />
                                                }
                                                selectsStart
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                startDate={
                                                    field.value ? new Date(field.value) : null
                                                }
                                                className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                            />
                                        )}
                                        rules={{ required: "Please Enter startDateTime" }}
                                    />
                                    {errors.endDateTime && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.endDateTime?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* startPoint */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Start Point
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <input
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        type="text"
                                        placeholder="startPoint"
                                        {...register("startPoint", {
                                            required: "Please Enter startPoint",
                                        })}
                                    />
                                    {errors.startPoint && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.startPoint?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* endingPoint */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Ending Point
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <input
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        type="text"
                                        placeholder="endingPoint"
                                        {...register("endingPoint", {
                                            required: "Please Enter endingPoint",
                                        })}
                                    />
                                    {errors.tripTitle && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.endingPoint?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* destinationImage */}
                            <div className="items-center gap-10 md:flex">
                                <label className="font-medium leading-6 text-right text-secondary md:w-32">
                                    Destination Image
                                </label>
                                <div className="flex-1 max-md:mt-4">
                                    <input
                                        className="w-full border-0 rounded-md shadow-sm bg-follow-btn text-primary"
                                        type="file"
                                        {...register("destinationImage", {
                                            required: "Please upload Destination Image!",
                                        })}
                                    />
                                    {errors.destinationImage && (
                                        <p className="text-secondary-btn" role="alert">
                                            {errors.destinationImage.message}
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

export default Itinerary;