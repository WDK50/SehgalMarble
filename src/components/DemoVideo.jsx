// src/components/DemoVideo.jsx
import React from 'react';

const DemoVideo = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Demo Video</h2>
      <div className="flex justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2">
          <iframe
            className="w-full h-64 md:h-96 rounded-md shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
