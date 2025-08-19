// src/components/RatingComponent.js
import React, { useState } from 'react';

function RatingComponent({ storeId, userRating, onSubmitRating }) {
  const [rating, setRating] = useState(userRating || 0);
  const [tempRating, setTempRating] = useState(0);

  const handleRatingClick = (value) => {
    setRating(value);
    onSubmitRating(storeId, value);
  };

  const handleMouseEnter = (value) => {
    setTempRating(value);
  };

  const handleMouseLeave = () => {
    setTempRating(0);
  };

  return (
    <div>
      <p>Rate this store:</p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: 'pointer',
              color: star <= (tempRating || rating) ? 'gold' : 'gray'
            }}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

export default RatingComponent;