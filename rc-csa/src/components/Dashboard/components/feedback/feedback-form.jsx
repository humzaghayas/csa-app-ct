import React, { useState } from 'react';
import './styles.css';

const FeedbackForm = () => {
  const [rating, setRating] = useState(null);

  const handleRatingClick = (event, value) => {
    event.preventDefault();
    setRating(value);
  };

  return (
    <div className="feedback-form">
      <h2>How was your experience with our customer service agent?</h2>
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <a
            href="#"
            key={i}
            onClick={(event) => handleRatingClick(event, i + 1)}
            className={i < rating ? 'active' : ''}
          >
            <i className="fa fa-star"></i>
          </a>
        ))}
      </div>
      {rating && (
        <div className="feedback-message">
          <p>Thank you for your feedback!</p>
          <p>You rated our customer service agent {rating} stars.</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
