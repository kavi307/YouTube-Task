import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false); 

  
  const apiKey = "AIzaSyDGIltbGzdw3u-igQS0PnVlhaVfCOnODIY"; 

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`
      );
      const data = await response.json();
      setSuggestions(data.items);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions(searchQuery);
  }, [searchQuery]);

  return (
    <div className="grid grid-flow-col p-5 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-icon-download-in-svg-png-gif-file-formats--crispy-user-interface-pack-icons-462145.png?f=webp&w=256"
        ></img>
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtubelogo"
            src="https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500"
          ></img>
        </a>
      </div>

      <div className="col-span-10 text-center relative">
        <input
          className="w-1/2 border border-gray-400 p-2 rounded-l-full"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <button className="border border-gray-400 p-2 rounded-r-full bg-gray-100">
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-1/2 border border-gray-300 bg-white shadow-lg rounded-lg">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSearchQuery(item.snippet.title);
                  setSuggestions([]);
                }}
              >
                {item.snippet.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="col-span-1 relative">
        <img
          className="h-8 cursor-pointer"
          alt="user-icon"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          onClick={() => setShowSignIn(!showSignIn)} // Toggle sign-in dropdown
        ></img>
        {showSignIn && (
          <div className="absolute right-0 mt-2 w-48 border border-gray-300 bg-white shadow-lg rounded-lg">
            <button
              className="w-full p-2 text-left hover:bg-gray-200"
              onClick={() => alert("Sign-in functionality here")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Head;
