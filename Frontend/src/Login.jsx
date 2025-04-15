import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmailId] = React.useState();
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [password, setPassword] = React.useState();
  const [isLogin, setIsLogin] = React.useState(true);
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);
  const Navigate = useNavigate();
const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        { email, password, firstName, lastName },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return Navigate("/profile");
    }catch(err){
      console.log(err);
    }
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return Navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Login failed. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-300 w-full max-w-md shadow-2xl p-6 rounded-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Login" : "SignUp"}
          </h2>

          <div className="space-y-4">
            {!isLogin && (
              <>
                {" "}
                <div>
                  <label className="block text-lg font-semibold mb-1">
                    First Name
                  </label>
                  <input
                    type="email"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full text-lg"
                    placeholder="Enter your First Name"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-1">
                    Last Name
                  </label>
                  <input
                    type="email"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full text-lg"
                    placeholder="Enter your Last Name"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-lg font-semibold mb-1">
                Email ID:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full text-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-1">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full text-lg"
                placeholder="Enter your password"
              />
            </div>

            {/* Optional Error Placeholder */}
            <p className="text-red-500 text-lg mt-1">{error}</p>
          </div>

          <div className="mt-6 text-center">
            <button
              className="btn btn-primary btn-lg w-full text-lg"
              onClick={isLogin? handleLogin:handleSignup}
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <p className="text-lg m-auto cursor-pointer py-2" onClick={()=>setIsLogin((value)=>!value)}>
            {isLogin ? "New User? Signup here" : "Existing User?Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
