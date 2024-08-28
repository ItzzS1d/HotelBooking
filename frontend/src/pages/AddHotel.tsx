import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(apiClient.submitForm, {
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("Failed to submit form:", error);
    },
  });
  const handleSubmit = async (data: FormData) => {
    mutate(data);
  };
  return <ManageHotelForm onSave={handleSubmit} isLoading={isLoading}/>;
};

export default AddHotel;
