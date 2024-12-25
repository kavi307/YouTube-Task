import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription state
  const [isNotified, setIsNotified] = useState(false); // Track notification state
  const [isLiked, setIsLiked] = useState(false); // Track like state
  const [likeCount, setLikeCount] = useState(0); // Track like count
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    fetchLikeCount(); // Fetch the like count when the page loads
  }, [dispatch]);

  // Function to handle subscribe action
  const handleSubscribe = () => {
    setIsSubscribed(true);
    console.log("Subscribed to the channel!");
  };

  // Function to handle bell icon click (for notifications)
  const handleBellClick = () => {
    setIsNotified(!isNotified); // Toggle notification state
    console.log(isNotified ? "Turned off notifications" : "Turned on notifications");
  };

  // Function to handle like action
  const handleLike = () => {
    setIsLiked(!isLiked); // Toggle like state
    if (isLiked) {
      setLikeCount(likeCount - 1); // Decrease like count if unliked
    } else {
      setLikeCount(likeCount + 1); // Increase like count if liked
    }
    console.log(isLiked ? "Unliked the video" : "Liked the video");
  };

  // Fetch the like count from YouTube API
  const fetchLikeCount = async () => {
    const videoId = searchParams.get("v");
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=YOUR_API_KEY`
      );
      const data = await response.json();
      const likeCount = data.items[0]?.statistics.likeCount || 0;
      setLikeCount(likeCount); // Set the actual like count
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  // Function to handle Share button click (copy the video URL)
  const handleShare = () => {
    const videoUrl = window.location.href; // Get the current video URL
    navigator.clipboard.writeText(videoUrl).then(() => {
      console.log("Video URL copied to clipboard!");
      alert("Video URL copied to clipboard!"); // Optional: Show an alert
    }).catch((error) => {
      console.error("Failed to copy URL:", error);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="px-5">
        <iframe
          width="1100"
          height="600"
          src={"https://www.youtube.com/embed/" + searchParams.get("v")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Subscribe, Bell Icon, and Like, Share, Download Button Section */}
      <div className="mt-4 flex items-center space-x-4 justify-end m-4">
        {/* Subscribe Button */}
        {isSubscribed ? (
          <button className="bg-gray-500 text-white p-2 rounded">
            Subscribed
          </button>
        ) : (
          <button
            onClick={handleSubscribe}
            className="bg-red-500 text-white p-2 rounded"
          >
            Subscribe
          </button>
        )}

        {/* Bell Icon */}
        <button
          onClick={handleBellClick}
          className={`p-2 rounded-full ${isNotified ? "bg-yellow-500" : "bg-gray-300"}`}
        >
          <i className={`fas ${isNotified ? "fa-bell" : "fa-bell-slash"} text-white`}></i>
        </button>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`p-2 rounded-full ${isLiked ? "bg-blue-500" : "bg-gray-300"}`}
        >
          <i className={`fas ${isLiked ? "fa-thumbs-up" : "fa-thumbs-up"} text-white`}></i>
        </button>
        <span>{likeCount} Likes</span>

        {/* Share Button */}
        <button onClick={handleShare} className="p-2 rounded-full bg-gray-300">
          <i className="fas fa-share-alt text-white"></i>
        </button>

        {/* Download Button */}
        <button className="p-2 rounded-full bg-gray-300">
          <i className="fas fa-download text-white"></i>
        </button>
      </div>

      {/* Comments Section */}
      <CommentsContainer />
    </div>
  );
};

export default WatchPage;
