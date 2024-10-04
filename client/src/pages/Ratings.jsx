import React from "react";
import StarRatings from "react-star-ratings";

function Ratings({ numberRating }) {
  return (
    <StarRatings
      starRatedColor="#E85A4F"
      starEmptyColor="gray"
      rating={numberRating}
      numberOfStars={5}
      starDimension={"15px"}
      starSpacing={"1px"}
      name="rating"
    />
  );
}

export default Ratings;