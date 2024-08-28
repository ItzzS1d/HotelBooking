import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 py-10">
      <div className="max-w-screen-xl  mx-auto flex justify-between items-center">
        <span className="text-white text-lg">
          MernHolidays.com &copy; {new Date().getFullYear()}
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
