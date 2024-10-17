import { useState, useEffect } from 'react'
import Ratings from '../../pages/Ratings';


const TopRatedBusiness = ({ businesses }) => {
    const [topRating, setTopRating] = useState({});

    useEffect(() => {
        calculateTopRatedBusiness();
    }, [businesses]);

    const calculateBusinessRating = async (id) => {
        const response = await fetch(`/api/business/${id}/reviews`); 
        const allReviews = await response.json();
        if (response.ok) {
            const ratings = allReviews.map((review) => review.rating);
            const sumOfRatings = ratings.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
            const meanRating = sumOfRatings / ratings.length;
            return meanRating;
        }
    };

    const calculateTopRatedBusiness = async () => {
        for (const business of businesses) {
            const overallRating = await calculateBusinessRating(business.id);
            business.overallRating = overallRating
        }
        let ratedTopBusiness = businesses[0];
        for (const business of businesses) {
            if (business.overallRating > ratedTopBusiness.overallRating) {
                ratedTopBusiness = business;
            }
        }
        setTopRating(ratedTopBusiness);
    }
    console.log("Top Rating", topRating);
    return (
        <>  
            {topRating &&
                <div>
                    <p>Congrat to the Top Rated Business:</p>
                    <h2>{topRating.name}</h2>
                    <img src = {topRating.image}></img>
                    <Ratings numberRating={topRating.overallRating}/>
                </div>
            }
        </>
    );
  }
  
  export default TopRatedBusiness;