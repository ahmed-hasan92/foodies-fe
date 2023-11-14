import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./ImageCarousel.css";

function ImageCarousel() {
  const [imageNames] = useState([
    "/meal-1.svg",
    "/meal-2.svg",
    "/meal-3.svg",
    "/meal-4.svg",
    "/meal-5.svg",
    "/meal-6.svg",
    "/meal-7.svg",
    "/meal-8.svg",
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageNames.length);
    }, 3000); // Change image every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [imageNames.length]);

  return (
    <div className="carousel-container flex justify-center items-center overflow-hidden relative">
      {imageNames.map((imageName, index) => (
        <img
          key={index}
          src={`/assets/login${imageName}`}
          alt={`Image ${index + 1}`}
          className={classNames("carousel-image", {
            "current-image": index === currentIndex,
          })}
        />
      ))}
    </div>
  );
}

export default ImageCarousel;
