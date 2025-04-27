// src/components/CarouselSlider.jsx
import React, { useState, useEffect } from 'react';
import slide1 from '/assets/S1.png';
import slide2 from '/assets/S2.png';
import slide3 from '/assets/S3.png';

const images = [slide1, slide2, slide3];

const CarouselSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  return (
    <div className="relative w-full overflow-hidden h-fit">
      {images.map((img, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
        >
          <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${index === current ? 'bg-blue-500' : 'bg-gray-300'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselSlider;
