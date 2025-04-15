import NavBar from "./NavBar.jsx";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx";
import axios from "axios";
import { BASE_URL } from "./utils/constants.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const userData=useSelector((store)=>store.user);



  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.log(err);
    }
  };

  useEffect(() => {
      fetchUser();
});

return (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

};
export default Body;
