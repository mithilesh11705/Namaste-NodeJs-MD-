import React from 'react';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { removeUserFromFeed } from './utils/feedSlice';
import { useDispatch } from 'react-redux';
const UserCard = ({ user, onAction }) => {
  const [loading, setLoading] = React.useState(false);

  const handleSendRequest = async (stat, userId) => {
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/request/send/${stat}/${userId}`,
        {},
        { withCredentials: true }
      );
      if (onAction) onAction(userId); // Trigger the parent action after success
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full rounded-3xl overflow-hidden shadow-lg bg-base-300 hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <figure className="w-full h-96 overflow-hidden rounded-xl">
          <img
            src={user?.photourl || "https://via.placeholder.com/400x300"}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </figure>
      </div>
      <div className="px-6 pb-6 text-center">
        <h2 className="text-2xl font-bold text-neutral-content">
          {user?.firstName} {user?.lastName}
        </h2>
      </div>
      <div className="card-actions justify-around my-4 p-4">
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={() => handleSendRequest("ignore", user?._id)}
        >
          Ignore
        </button>
        <button
          className="btn btn-secondary"
          disabled={loading}
          onClick={() => handleSendRequest("interested", user?._id)}
        >
          Interested
        </button>
      </div>
    </div>
  );
};


export default UserCard;
