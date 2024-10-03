import React from "react";
import StarRatings from "react-star-ratings";

function Ratings({ numberRating }) {
  return (
    <StarRatings
      starRatedColor="#e50916"
      starEmptyColor="gray"
      rating={numberRating / 2}
      numberOfStars={5}
      starDimension={"15px"}
      starSpacing={"1px"}
      name="rating"
    />
  );
}

export default Ratings;