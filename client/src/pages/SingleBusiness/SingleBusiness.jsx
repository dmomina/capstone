import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import "./singleBusiness.css";
import Ratings from "../Ratings.jsx";


function SingleBusiness({}) {
    const {id} = useParams();
    const [business, setBusiness] = useState([]);
    const [reviews, setReviews] = useState([]);

    const token = window.localStorage.getItem("token");

    useEffect(() => {
        getSingleBusinesses();
        getSingleBusinessesReviews();
    }, []);

    const getSingleBusinesses = async () => {
        const response = await fetch(`/api/business/${id}`); 
        const json = await response.json();
        if (response.ok) {
            setBusiness(json[0]);
        } 
    };

    const getSingleBusinessesReviews = async () => {
        const response = await fetch(`/api/business/${id}/reviews`);
        const allReviews = await response.json();
        if (response.ok) {
            for (const review of allReviews) {
                const userResponse = await fetch (`/api/users/${review.userid}`)
                let user = await userResponse.json();
                if (userResponse.ok) {
                    user = user[0];
                    review.username = user.username;
                }
            }
            setReviews(allReviews);
        } 
    };

    return (
        <div className="single-business-list">
            {business && (
                <>
                    <h2>{business.name}</h2> 
                    <p>{business.description}</p>
                    <img src = {business.image} className="business-image" alt={business.name}></img> 
                    {token && (
                        <p> <a href='/createReview'>Review {business.name}</a></p>
                    )}
                    {!token && (<p> <a href='/login'>Login</a> to review!</p>)}
                </> 
            )}
            <h2>All {business.name} Reviews:</h2>
            {reviews && reviews.map(
                (review) => (
                    <div key={review.id} className="review-container">
                        <div className="review-header">
                            <h3>{review.username}</h3>
                            <Ratings numberRating = {review.rating}/>
                        </div>
                        <div className="review-content">
                            <p className="review-text">{review.text}</p>
                        </div>
                </div>
                )
            )}
        </div>
    )
}

export default SingleBusiness