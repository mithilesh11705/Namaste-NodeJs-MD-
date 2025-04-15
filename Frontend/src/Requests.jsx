/* eslint-disable no-unused-vars */
import React from "react";
import { BASE_URL } from "./utils/constants";
import { removeRequest } from "./utils/requestSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequest } from "./utils/requestSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);

  const reveiwRequest = async (stat, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + stat + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      //  console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      console.log(request);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  console.log(request);
  if (!request)
    return <h1 className="text-4xl font-bold m-3 mx-8">Loading...</h1>;

  if (request.length === 0)
    return (
      <h1 className="text-4xl font-bold m-3 mx-8">No Connection Found!!</h1>
    );

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="text-4xl font-bold mb-10">Connections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {request.map((requestItem) => (
          <div
            key={requestItem?.fromUserId?._id}
            className="bg-300 rounded-2xl shadow-lg border p-6 flex flex-col items-center transition-transform hover:scale-105"
          >
            <img
              src={
                requestItem?.fromUserId?.photourl ||
                "https://via.placeholder.com/150"
              }
              alt="User"
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold">
              {requestItem?.fromUserId?.firstName}{" "}
              {requestItem?.fromUserId?.lastName}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{requestItem?.status}</p>

            <div className="flex gap-4 mt-auto">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl"
                onClick={() => reveiwRequest("rejected", requestItem?._id)}
              >
                Reject
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-xl"
                onClick={() => reveiwRequest("accepted", requestItem?._id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
