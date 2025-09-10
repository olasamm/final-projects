import React, { useState } from 'react';
import './Review.css';

const reviews = [
  { text: "This platform has been a game-changer for managing assignments and staying organized!", author: "John Doe", img: "https://media.istockphoto.com/id/1369199360/photo/portrait-of-a-handsome-young-businessman-working-in-office.jpg?b=1&s=612x612&w=0&k=20&c=-zIXXuXi1Bufza1-8Pay9Q-a65BbNxolOJJlMY62siI=" },
  { text: "The ability to track progress and provide feedback efficiently has improved my workflow.", author: "Jane Smith", img: "https://images.pexels.com/photos/12639453/pexels-photo-12639453.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { text: "Great tool for collaboration between students and lecturers!", author: "Alice Brown", img: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { text: "The user interface is intuitive and easy to use.", author: "Bob Johnson", img: "https://images.pexels.com/photos/7869704/pexels-photo-7869704.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { text: "I love how everything is organized in one place.", author: "Emily Davis", img: "https://images.pexels.com/photos/5717546/pexels-photo-5717546.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { text: "The notifications keep me on track with deadlines.", author: "Michael Wilson", img: "https://images.pexels.com/photos/7845093/pexels-photo-7845093.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { text: "A must-have tool for academic institutions.", author: "Sarah Lee", img: "https://images.pexels.com/photos/5398945/pexels-photo-5398945.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { text: "It has simplified the grading process significantly.", author: "Chris Evans", img: "https://images.pexels.com/photos/7841483/pexels-photo-7841483.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { text: "The feedback system is very effective.", author: "Sophia Taylor", img: "https://images.pexels.com/photos/7691678/pexels-photo-7691678.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { text: "Highly recommend this platform to everyone.", author: "Daniel Moore", img: "https://images.pexels.com/photos/7317926/pexels-photo-7317926.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const Review = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

  return (
    <div className="review-container">
      <h2 className="text-center my-4">User Reviews</h2>
      <div className="review-row">
        <button className="arrow-btn" onClick={handlePrev}>&lt;</button>
        <div className="review-cards-container">
          {visibleReviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-img-container">
                <img src={review.img} alt={review.author} className="review-img" />
              </div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-author text-end">- {review.author}</p>
            </div>
          ))}
        </div>
        <button className="arrow-btn" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Review;
