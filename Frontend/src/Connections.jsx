import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from './utils/connectionSlice.jsx';

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res.data.connections);
      dispatch(addConnection(res.data.connections));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1 className="text-4xl font-bold">Loading...</h1>;

  if (connections.length === 0)
    return <h1 className="text-4xl font-bold">No Connection Found!!</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-4xl font-bold mb-6">Connections</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="w-80 p-8 rounded-2xl shadow-xl border flex flex-col items-center"
          >
            <img
              src={connection.photourl || "https://via.placeholder.com/150"}
              alt="User"
              className="w-40 h-40 rounded-full mb-4"
            />
            <h1 className="text-2xl font-semibold">{connection.firstName}</h1>
            <h1 className="text-lg text-gray-600">{connection.lastName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Connections;
