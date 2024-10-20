import { useState, useEffect } from 'react'
import Ratings from '../../pages/Ratings';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BusinessRating = ({ businessid })=> {
    const [rating, setRating] = useState();

    useEffect(() => {
       calculateBusinessRating();
    }, []);

    const calculateBusinessRating = async () => {
        const response = await fetch(`${BASE_URL}/api/business/${businessid}/reviews`); 
        const allReviews = await response.json();
        if (response.ok) {
            const ratings = allReviews.map((review) => review.rating);
            if (ratings) {
                const sumOfRatings = ratings.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                );
                const meanRating = sumOfRatings / ratings.length;
                setRating(meanRating);
            }
        }
    };
    
    return (
        <>
            {rating && 
                    <div>
                        <p>Rating: </p> 
                        <Ratings numberRating={rating}/>
                    </div>     
            }
            
        </>
    );
  }
  
  export default BusinessRating;