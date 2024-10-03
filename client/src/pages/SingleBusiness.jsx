import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'


function SingleBusiness({pageType}) {
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
        const json = await response.json();
        if (response.ok) {
            // create a const and put json[0] in it which will be all reviews
            // then loop through all reviews and for each review make a request to fetch the user by the user id
            // const allReviews = json([0]);
            // for ({reviews.userid}) {
            //     const userName = await fetch(`api/users/${id}`)
            // }
            setReviews(json[0]);
        } 
    };

    const singleBusinessStyles = {
        width: pageType === "single-business" ? "80%" : "80%",
        margin: pageType === "single-business" ? "0 auto" : null,
        
    };
      
    const imgSingleStyles = {
        width: pageType === "single-business" ? "70%" : "70%",
    };

    return (
        <div className="single-business-list" style={singleBusinessStyles}>
            {business && (
                <>
                    <p>{business.name} {":"} {business.description}</p>
                    <br />
                    <img src = {business.image} style={imgSingleStyles}></img> 
                    <br /> 
                    {token && (
                        <p> <a href='/createReview'>Review {business.name}</a></p>
                    )}
                    {!token && (<p> <a href='/login'>Login</a> to review!</p>)}
                </> 
            )}
            {reviews && (
                <>
                    <p>All {business.name} Reviews:</p>
                    <br />
                    <p>Review:{reviews.userid}</p>
                    <p>Review:{reviews.text}</p>
                    <p>Rating:{reviews.rating}</p>
                </>
            )}
        </div>
    )
}

export default SingleBusiness