import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function SingleBusiness({pageType}) {
    const {id} = useParams();
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        getSingleBusinesses();
    }, []);

    const getSingleBusinesses = async () => {
        const response = await fetch(`/api/business/${id}`); 
        const json = await response.json();
        if (response.ok) {
            setBusiness(json[0]);
        } 
    };

    const singleBusinessStyles = {
        width: pageType === "single-business" ? "70%" : "70%",
        margin: pageType === "single-business" ? "0 auto" : null,
      };
      
      const imgSingleStyles = {
        width: pageType === "single-business" ? "70%" : "70%",
      }

    return (
        <div className="single-business-list" style={singleBusinessStyles}>
            {business && (
                <>
                    <p>{business.name} {":"} {business.description}</p>
                    <br />
                    <img src = {business.image} style={imgSingleStyles}></img> 
                    <br /> 
                    <Link to={`/createReview`}>Create a Review for {business.name}</Link>
                </> 
            )}
        </div>
    )
}

export default SingleBusiness