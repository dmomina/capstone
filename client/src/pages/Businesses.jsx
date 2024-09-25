import "./businesses.css";
import React from 'react';
import { Link } from 'react-router-dom';

const Businesses = ({ businesses })=> {
  return (
    <>
        {businesses.map(
          (business) => (
            <div key={business.id}>
              {business.name}
              <img src = {business.image}></img>
              <Link to={`/business/${business.id}`}>See Details!</Link>
            </div>
          )
        )}
    </>
  );
}


export default Businesses;


