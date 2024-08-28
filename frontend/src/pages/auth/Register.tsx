import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api-client";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const mutation = useMutation(apiClient.register, {
    onSuccess: async() => {
      navigate("/");
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      setError("");
      setError(error.message);
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="md:flex flex-col gap-5" onSubmit={onSubmit}>
      <h1 className={`text-4xl font-bold ${error && "text-red-500"}`}>
        {error ? error : "Create An Account"}
      </h1>
      <div className="flex flex-col md:flex-row gap-5 my-4 md:my-0">
        <label
          htmlFor="firstname"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          First Name
          <input
            type="text"
            id="firstname"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </label>
        <label
          htmlFor="lastName"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Last Name
          <input
            type="text"
            id="lastName"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </label>
      </div>
      <label htmlFor="email" className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="text"
          id="email"
          className="border rounded w-full py-1 px-2 font-normal "
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>
      <label htmlFor="password" className="text-gray-700 text-sm font-bold">
        Password
        <input
          type="text"
          id="password"
          className="border rounded w-full py-1 px-2 font-normal my-4 md:my-0"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div>
          <span className="font-semibold">Already have an account? <Link to={"/login"} className="text-blue-700 underline">Login</Link></span>
        </div>
      </label>
      
      <div>
        
      </div>
      <button className="bg-blue-800 text-white py-2">Create Account</button>
    </form>
  );
};

export default Register;
