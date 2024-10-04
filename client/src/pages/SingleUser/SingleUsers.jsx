import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Ratings from "../Ratings.jsx";

function SingleUsers({token}) {
    const {id} = useParams();
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getSingleUsers();
        getSingleUserReviews();
    }, []);

    const getSingleUsers = async () => {
        const response = await fetch(`/api/users/${id}`); 
        const json = await response.json();
        if (response.ok) {
            setUsers(json[0]);
        } 
    };

    const getSingleUserReviews = async () => {
        const response = await fetch(`/api/users/${id}/reviews`);
        const allReviews = await response.json();
        if (response.ok) {
            for (const review of allReviews) {
                const businessResponse = await fetch(`/api/business/${review.businessid}`)
                let business = await businessResponse.json();
                if (businessResponse.ok) {
                    business = business[0];
                    review.businessname = business.name;
                }
            }
        }
        setReviews(allReviews);
    }

    return (
        <>
            {users && (
                <p>{users.username}</p>
            )}
            {reviews && reviews.map(
                (review) => (
                    <div key={review.id}>
                        <div>
                            <Ratings numberRating = {review.rating}/>
                        </div>
                        <div>
                            <h3>{review.businessname}</h3>
                            <p>{review.text}</p>
                        </div>
                    </div>
                )
            )}
        </>
    );
}

export default SingleUsers