import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        left: 0,
        height: "100vh",
        width: "140px",  // You can adjust the width
        overflowY: "auto",
        background : "white"
      }}
      className="p-5 shadow-lg"
    >
      <ul>
        <li className="font-bold">
          <Link to="/">Home</Link>
        </li>
        <li className="font-bold">Shorts</li>
        <li className="font-bold">Live</li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>

      <h1 className="font-bold pt-5">Explore</h1>
      <ul>
        <li>Trending</li>
        <li>Shopping</li>
        <li>News</li>
        <li>Courses</li>
      </ul>
    </div>
  );
};

export default Sidebar;
