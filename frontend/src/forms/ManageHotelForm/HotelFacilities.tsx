import { facilities } from "../../config/hoteloptionsconfig";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const HotelFacilities = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Facilites</h1>
      <div className="grid grid-cols-5 gap-4">
        {facilities.map((facility) => (
          <label key={facility}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facility) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility must be required.";
                  }
                },
              })}
            />
            &nbsp;{facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <p className="text-red-500">{errors.facilities.message}</p>
      )}
    </div>
  );
};

export default HotelFacilities;
