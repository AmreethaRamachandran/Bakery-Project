import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';


const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex justify-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer transition-colors duration-200"
              color={ratingValue <= rating ? '#74634dff' : '#e4e5e9'}
              size={30}
            />
          </label>
        );
      })}
    </div>
  );
};
const ReviewPage = ({ onBackClick }) => { 
  const [reviewData, setReviewData] = useState({
    name: '',
    rating: 0,
    reviewText: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setReviewData(prev => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review Submitted:', reviewData);

    alert('Thank you for sharing your feedback!');
    
    onBackClick(); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col items-center">
      {/* Back Button */}
      <button 
        onClick={onBackClick}
        className="self-start text-[#FF6B35] hover:text-[#FFA500] font-semibold mb-6 flex items-center"
      >
        &larr; Back to Home
      </button>

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 transform transition-all duration-300">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#FF6B35]">
            Write Your Review
          </h2>
          <p className="text-gray-500 mt-2">
            Share your experience with from Karaikudi
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-6 text-center">
            <label className="block text-lg font-medium text-gray-700 mb-2">Overall Rating</label>
            <StarRating 
              rating={reviewData.rating} 
              onRatingChange={handleRatingChange} 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={reviewData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#FF6B35] focus:border-[#FF6B35] text-base"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">Your Review</label>
            <textarea
              id="reviewText"
              name="reviewText"
              rows="5"
              value={reviewData.reviewText}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#FF6B35] focus:border-[#FF6B35] text-base"
              placeholder="We’d love to hear your thoughts about our products!"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={reviewData.rating === 0}
            className="w-full px-6 py-3 bg-[#FFA500] text-white rounded-lg font-semibold shadow-lg hover:bg-[#FF6B35] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;