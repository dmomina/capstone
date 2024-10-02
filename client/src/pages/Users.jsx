import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users })=> {
  
  return (
    <>
      {users.map(
        (users) => (
          <div key={users.id}>
            {users.username}
            <br />
            <Link to={`/users/${users.id}`}>See {users.username} all reviews</Link>
          </div>
        )
      )}
    </>
  );
}


export default Users;
