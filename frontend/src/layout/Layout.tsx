import React from "react";
import Headers from "../components/Header";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode;

}

const Layout = ({children}: Props) => {
  return (
    <div className="">
      <Headers />
     
      <div className="max-w-screen-xl mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
