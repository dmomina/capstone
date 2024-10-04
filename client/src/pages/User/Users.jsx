import React from "react";
import { Link } from "react-router-dom";
import "./users.css";

const Users = ({ users })=> {
  
  return (
    <>
      {users.map(
        (users) => (
          <div className="user-card" key={users.id}>
            <div className="username">{users.username}</div>
            <br />
            <Link to={`/users/${users.id}`}>See all reviews from {users.username}</Link>
          </div>
        )
      )}
    </>
  );
}


export default Users;
