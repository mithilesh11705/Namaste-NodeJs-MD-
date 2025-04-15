import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constants";
import { addFeed, removeUserFromFeed } from "./utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getFeed();
  }, []);

  const handleAction = async (userId) => {
    // Remove user from feed
    try {
      dispatch(removeUserFromFeed(userId));

      // Increment the index to show the next user, but make sure we don't exceed the feed length
      if (currentIndex < feed.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Or you can handle resetting the feed differently
      }
    } catch (error) {
      console.error("Error removing user", error);
    }
  };

  // Dynamically check if the feed is empty after the user is removed
  if (!feed || feed.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-lg font-medium">
        No more users in your feed.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center my-10 py-4">
      <UserCard user={feed[currentIndex]} onAction={handleAction} />
    </div>
  );
};

export default Feed;
