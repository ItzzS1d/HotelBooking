import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label htmlFor="Name" className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          id="Name"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("name", { required: "name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </label>
      <div className="flex gap-5">
        <label
          htmlFor="City"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          City
          <input
            type="text"
            id="City"
            className="border rounded w-full py-2 px-2 font-normal"
            {...register("city", { required: "city is required" })}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </label>
        <label
          htmlFor="Country"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Country
          <input
            type="text"
            id="Country"
            className="border rounded w-full py-2 px-2 font-normal"
            {...register("country", { required: "country is required" })}
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </label>
      </div>
      <label
        htmlFor="Description"
        className="text-gray-700 text-sm font-bold flex-1"
      >
        Description
        <textarea
          id="Description"
          className="border rounded w-full py-2 px-2 font-normal"
          rows={8}
          {...register("description", { required: "description is required" })}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </label>
      <label
        htmlFor="PricePerNight"
        className="text-gray-700 text-sm font-bold max-w-[50%]"
      >
        Price Per Night
        <input
          type="number"
          id="PricePerNight"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("pricePerNight", {
            required: "pricePerNight is required",
          })}
        />
        {errors.pricePerNight && (
          <p className="text-red-500">{errors.pricePerNight.message}</p>
        )}
      </label>
      <label
        htmlFor="StarRating"
        className="text-gray-700 w-full text-sm font-bold flex-1"
      >
        StarRating <br />
        <select
          {...register("starRating", { required: "Rating is required" })}
          className="border rounded  p-2  w-[40%] text-gray-700 font-normal"
        >
          <option value="0" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <p className="text-red-500">{errors.starRating.message}</p>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
