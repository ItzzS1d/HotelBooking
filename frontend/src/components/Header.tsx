import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Signoutbutton from "./Signoutbutton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-blue-800 py-6">
      <div className="max-w-screen-xl mx-auto flex justify-between  px-2">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>MernHolidays.com</Link>
        </span>
        <span className="flex gap-5">
          {isLoggedIn ? (
            <>
              <Link
                to={"/"}
                className=" px-3 py-1 font-bold  hover:bg-blue-600 text-white"
              >
                {" "}
                MyBookings
              </Link>
              <Link
                to={"/"}
                className="text-white px-3 py-1 font-bold  hover:bg-blue-600"
              >
                MyHotels
              </Link>
             <Signoutbutton />
            </>
          ) : (
            <Link to={"/login"}>
              <button className="text-blue-600 px-3 py-1 font-bold bg-white hover:bg-gray-200">SignIn</button>
            </Link>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
