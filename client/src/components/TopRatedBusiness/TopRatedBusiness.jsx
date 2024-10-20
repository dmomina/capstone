import { useState, useEffect } from 'react'
import Ratings from '../../pages/Ratings';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const TopRatedBusiness = ({ businesses }) => {
    const [topRating, setTopRating] = useState({});

    useEffect(() => {
        calculateTopRatedBusiness();
    }, [businesses]);

    const calculateBusinessRating = async (id) => {
        const response = await fetch(`${BASE_URL}/api/business/${id}/reviews`); 
        const allReviews = await response.json();
        if (response.ok) {
            const ratings = allReviews.map((review) => review.rating);
            if (ratings) {
                const sumOfRatings = ratings.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                );
                const meanRating = sumOfRatings / ratings.length;
                return meanRating;
            } 
        }
        return null;
    };

    const calculateTopRatedBusiness = async () => {
        for (const business of businesses) {
            const overallRating = await calculateBusinessRating(business.id);
            business.overallRating = overallRating ?? 0;
        }
        let ratedTopBusiness = businesses[0];
        for (const business of businesses) {
            if (business.overallRating > ratedTopBusiness.overallRating) {
                ratedTopBusiness = business;
            }
        }
        setTopRating(ratedTopBusiness);
    }
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