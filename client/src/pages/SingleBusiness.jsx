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
            setReviews(json[0]);
        } 
    }

    const singleBusinessStyles = {
        width: pageType === "single-business" ? "70%" : "70%",
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
                    <p>{reviews.text}</p>
                </>
            )}
        </div>
    )
}

export default SingleBusiness