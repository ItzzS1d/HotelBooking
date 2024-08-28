import { HotelFormData } from "./ManageHotelForm";
import { useFormContext } from "react-hook-form";

const Images = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "At least one image is required";
              }
              if (totalLength > 5) {
                return "Maximum 5 images are allowed";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <p className="text-red-500">{errors.imageFiles.message}</p>
      )}
    </div>
  );
};

export default Images;
