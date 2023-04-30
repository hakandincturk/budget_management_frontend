import React from "react";
import './LoadingSpinnerCss.css'

function Loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="spinner-container">
        <div className="loading-spinner shadow"></div>
      </div>
    </div>
  );
}

export default Loading;
