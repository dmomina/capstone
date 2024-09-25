import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'

function SingleBusiness({}) {
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

    return (
        <>
            {business && (
                <>
                    <p>{business.name} {":"} {business.description}</p>
                    <img src = {business.image}></img>  
                </> 
            )}
        </>
    )
}

export default SingleBusiness