import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route path="/" element={<Layout>hello</Layout>} />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      {isLoggedIn && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default App;
