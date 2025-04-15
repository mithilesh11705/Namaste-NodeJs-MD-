import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constants.js";
import { removeUser } from "./utils/userSlice.js";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-md px-4 py-2">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-4xl font-bold tracking-wide">
          DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">
            Welcome,{" "}
            <span className="text-primary">{user?.data?.firstName}</span>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary hover:ring-offset-2"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  alt="User"
                  src={user?.data?.photourl}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56 text-lg"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between hover:text-primary text-lg"
                >
                  Profile <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:text-primary text-lg"> Connections</Link>
              </li>
              <li>
                <Link to="/requests" className="hover:text-primary text-lg">Requests</Link>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="hover:text-red-500 text-lg"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
