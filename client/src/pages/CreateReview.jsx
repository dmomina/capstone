import React, { useEffect, useState, usseEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateReview = ({ businesses })=> {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const token = window.localStorage.getItem("token");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      axios
        .post(`/api/reviews/create`, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        })
        .then ((response) => {
          if (response.data) {
            console.log(response);
          }
        })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Create Review</h1>
      <form onSubmit={handleSubmit} id="rating-form">
        <label htmlFor="business-select">Pick a Business</label>
        <select name="businessid" id="business-select" onChange={handleInput}>
          <option value="">--Please Choose a Business--</option>
          <option value="Acme Pizza">Acme Pizza</option>
          <option value="Moe's Typewriter Repair">Moe's Typewriter Repair</option>
          <option value="Lucy's Candy Shop">Lucy's Candy Shop</option>
          <option value="Mary's Flower Shop">Mary's Flower Shop</option>
        </select>
        <br />
        <label>
          Comment:
          <input type='text' name='text' onChange={handleInput}></input>
        </label>
        <br />
        <label htmlFor="business-ratings">Rating</label>
        <select name="rating" id="business-ratings" onChange={handleInput}>
          <option value="">--Please Choose a Rating--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <button>Submit Review</button>
      </form>
    </>
  );
}


export default CreateReview;
