import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-not-found-bg2 bg-cover h-[100vh]">
      <div className="h-full w-full pt-[440px] text-white text-lg font-normal hover:font-bold flex justify-center items-center">
        <Link to="login">"GO BACK HOME"</Link>
      </div>
    </div>
  );
};

export default NotFound;
