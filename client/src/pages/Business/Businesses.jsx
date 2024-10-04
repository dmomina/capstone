import "./businesses.css";
import React from 'react';
import { Link } from 'react-router-dom';
import BusinessRating from "../../components/BusinessRating/BusinessRating";

const Businesses = ({ businesses })=> {

  return (
    <div className="business-list">
        {businesses.map(
          (business) => (
            <div className="business-item" key={business.id}>
              <span className="business-name">{business.name}</span> 
              <div className="business-rating">
                <BusinessRating businessid={business.id} />
              </div>
              <br/>
              <img src = {business.image} className="business-image" alt={business.name} ></img>
              <br />
              <Link to={`/business/${business.id}`} className="link">See Details!</Link>
              <br />
            </div>
          )
        )}
    </div>
  );
}


export default Businesses;


