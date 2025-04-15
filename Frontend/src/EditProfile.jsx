
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice"; 
import { BASE_URL } from "./utils/constants"; 
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);
  const [firstName, setFirstName] = React.useState(user?.data?.firstName || "");
  const [lastName, setLastName] = React.useState(user?.data?.lastName || "");
  const [photourl, setPhotoUrl] = React.useState(user?.data?.photourl || "");
const [showToast, setShowToast] = React.useState(false);
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photourl,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.user));
      setShowToast(true);
      const  i=setTimeout(() => {
        setShowToast(false);
        clearInterval(i);
      },3000);
      console.log("User updated successfully");
    } catch (err) {
      console.log(err);
      setError("Error saving profile. Please try again.");
    }
  };

  return (<>
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-full max-w-md shadow-2xl p-6 rounded-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1">Photo Url</label>
                <input
                  type="text"
                  value={photourl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full text-lg"
                />
              </div>

              {error && <p className="text-red-500 text-lg mt-1">{error}</p>}
            </div>

            <div className="mt-6 text-center">
              <button
                className="btn btn-primary btn-lg w-full text-lg"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photourl }} />
    </div>
   { showToast && (<div className="toast toast-top toast-center">
 
  <div className="alert alert-success">
    <span>Profile Saved successfully.</span>
  </div>
</div>)}
</>
  );
};

export default EditProfile;
