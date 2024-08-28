import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import HotelTypes from "./HotelTypes";
import HotelFacilities from "./HotelFacilities";
import Guests from "./Guests";
import Images from "./Images";

export type HotelFormData = {
  name: string;
  description: string;
  city: string;
  country: string;
  pricePerNight: string;
  type: string;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};
type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};
const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((data: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight);
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());
    data.facilities.forEach((facility, index) =>
      formData.append(`facilities[${index}]`, facility)
    );
    Array.from(data.imageFiles).forEach((file) =>
      formData.append("imageFiles", file)
    );
    onSave(formData);
    console.log(data);
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <HotelTypes />
        <HotelFacilities />
        <Guests />
        <Images />
        <abbr title="submit">
          <span>
            <button
              className={`px-10 py-2  text-white  ${
                isLoading ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Uploading Your Home" : " Submit"}
            </button>
          </span>
        </abbr>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
