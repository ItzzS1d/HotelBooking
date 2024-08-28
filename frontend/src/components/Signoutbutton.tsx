import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";

const Signoutbutton = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error:Error) => {
      console.error("Failed to log out:", error);
    },
  } );

  const signOut = () => {
    mutation.mutate();
    
  };

  return (
    <button
      className="text-blue-600 px-3 py-1 font-bold bg-white hover:bg-gray-200"
      onClick={signOut}
    >
      SignOut
    </button>
  );
};

export default Signoutbutton;
