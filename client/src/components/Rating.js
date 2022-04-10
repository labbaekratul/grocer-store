import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
function Rating({ reviews, rating }) {
  return (
    <div className="start_review">
      <span>
        {rating >= 1 ? (
          <BsStarFill className="star_color" />
        ) : rating >= 0.5 ? (
          <BsStarHalf className="star_color" />
        ) : (
          <BsStar className="star_color" />
        )}
        {rating >= 2 ? (
          <BsStarFill className="star_color" />
        ) : rating >= 1.5 ? (
          <BsStarHalf className="star_color" />
        ) : (
          <BsStar className="star_color" />
        )}
        {rating >= 3 ? (
          <BsStarFill className="star_color" />
        ) : rating >= 2.5 ? (
          <BsStarHalf className="star_color" />
        ) : (
          <BsStar className="star_color" />
        )}
        {rating >= 4 ? (
          <BsStarFill className="star_color" />
        ) : rating >= 3.5 ? (
          <BsStarHalf className="star_color" />
        ) : (
          <BsStar className="star_color" />
        )}
        {rating >= 5 ? (
          <BsStarFill className="star_color" />
        ) : rating >= 4.5 ? (
          <BsStarHalf className="star_color" />
        ) : (
          <BsStar className="star_color" />
        )}
      </span>
      <span className="review">reviews {reviews}</span>
    </div>
  );
}

export default Rating;
