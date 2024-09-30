import "./businesses.css";
import React from 'react';
import { Link } from 'react-router-dom';

const Businesses = ({ businesses, pageType, token })=> {
  const businessStyles = {
    width: pageType === "business" ? "40%" : "40%",
    margin: pageType === "business" ? "0 auto" : null,
  };

  const imgStyles = {
    width: pageType === "business" ? "40%" : "100%",
  };

  return (
    <div className="business-list" style={businessStyles}>
        {businesses.map(
          (business) => (
            <div key={business.id}>
              {business.name}
              <br/>
              <img src = {business.image} style={imgStyles} ></img>
              <br />
              <Link to={`/business/${business.id}`}>See Details!</Link>
              <br />
            </div>
          )
        )}
    </div>
  );
}


export default Businesses;


