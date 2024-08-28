import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api-client";
import { Link, useNavigate } from "react-router-dom";

export type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const mutation = useMutation(apiClient.logIn, {
    onSuccess: async() => {
     navigate("/")
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
    <form onSubmit={onSubmit}>
      <h1 className={`text-4xl font-bold ${error && "text-red-500"}`}>
        {error ? error : "Sign In to your account"}
      </h1>
      <div className="mt-6">
        <label
          htmlFor="email"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Email
          <input
            type="text"
            id="email"
            className="border rounded w-full py-2 px-2 font-normal"
            {...register("email", { required: "email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </label>
      </div>
      <div className="mt-4">
        <label
          htmlFor="password"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Password
        </label>
        <input
          type="text"
          id="password"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("password", { required: "password is required" })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <span className="text-sm font-semibold">Don't have an account? <Link to={"/register"} className="text-blue-800 underline">Register</Link></span>
      <button type="submit" className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign In
      </button>
    </form>
  );
};

export default Login;
