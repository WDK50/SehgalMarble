// src/components/Reviews.jsx
import React from 'react';

const reviews = [
  { id: 1, name: 'Alice', comment: 'Great quality and fast shipping!' },
  { id: 2, name: 'Bob', comment: 'I love the design and usability.' },
  { id: 3, name: 'Carol', comment: 'Excellent customer support.' },
];

const Reviews = () => {
  return (
    <section className="py-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">User Reviews</h2>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-md shadow-md flex-1">
            <p className="italic text-gray-600">"{review.comment}"</p>
            <p className="mt-2 font-semibold text-gray-800 text-right">- {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
