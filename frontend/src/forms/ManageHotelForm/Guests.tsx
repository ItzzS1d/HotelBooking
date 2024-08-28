import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const Guests = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="bg-gray-300 gap-5 p-6 grid grid-cols-2 ">
        <label className="text-gray-700 text-sm font-semibold">
          Adults &nbsp;
          <input
            {...register("adultCount", {
              required: "atlease 1 adult is required",
            })}
            type="number"
            className="bg-white py-1.5 px-4"
            min={1}
          />
        </label>
        <label>
          Children &nbsp;
          <input
            {...register("childCount", { required: true })}
            type="number"
            className="bg-white py-1 px-4"
            />
        </label>
      </div>
            {errors.adultCount && (
              <span className="text-red-500">{errors.adultCount.message}</span>
            )}
    </div>
  );
};

export default Guests;
