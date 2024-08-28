import { RegisterFormValues } from "./pages/auth/Register";
import { LoginFormValues } from "./pages/auth/Login";
import { HotelFormData } from "./forms/ManageHotelForm/ManageHotelForm";
export const register = async (formData: RegisterFormValues) => {
  const res = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
};

export const logIn = async (formData: LoginFormValues) => {
  const res = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
};

export const logout = async () => {
  const res = await fetch("http://localhost:3000/api/users/log_out", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to log out");
  }
};

export const validateToken = async () => {
  const res = await fetch("http://localhost:3000/api/users/validate_token", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Invalid token");
  }
  const data = await res.json();
  return data;
};

export const submitForm = async (data: FormData) => {
  const res = await fetch("http://localhost:3000/api/hotels/create-hotel", {
    method: "POST",
    credentials: "include",
    body: data,
  });
  if (!res.ok) {
    throw new Error("Failed to submit form");
  }
  return res.json();
};
