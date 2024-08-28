import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hoteloptionsconfig";
import { HotelFormData } from "./ManageHotelForm";

const HotelTypes = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Types</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
          key={type}
            className={`${
              typeWatch === type ? "bg-blue-300" : "bg-gray-300"
            } rounded-full font-semibold px-4 py-3 cursor-pointer`}
          >
            <input
              type="radio"
              key={type}
              value={type}
              {...register("type", { required: "Type is required" })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && <p className="text-red-500">{errors.type.message}</p>}
    </div>
  );
};

export default HotelTypes;
