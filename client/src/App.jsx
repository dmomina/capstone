import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./pages/User/Users.jsx";
import Businesses from "./pages/Business/Businesses.jsx";
import CreateReview from "./pages/Review/CreateReview.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SingleBusiness from "./pages/SingleBusiness/SingleBusiness.jsx";
import SingleUsers from "./pages/SingleUser/SingleUsers.jsx";


function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(() => {
    attemptLoginWithToken();
    getBusinesses();
    getUsers();
    getReviews();
    const localtoken = window.localStorage.getItem("token");
      if(localtoken) {
        setToken(localtoken);
      }
  }, []);

  const getBusinesses = async () => {
    const response = await fetch(`/api/business`); 
    const json = await response.json();
    if (response.ok) {
      setBusinesses(json);
    } 
  };

  const getUsers = async () => {
    const response = await fetch(`/api/users`); 
    const json = await response.json();
    if (response.ok) {
      setUsers(json);
    } 
  };

  const getReviews = async () => {
    const response = await fetch (`/api/reviews`);
    const json = await response.json();
    if (response.ok) {
      setReviews(json);
    }
  }

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };

  const authAction = async (credentials, mode) => {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
    } else {
      throw json;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <>
      <h1 className="title">Acme Business Reviews</h1>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/businesses">BUSINESSES ({businesses.length})</Link>
        <Link to="/users">USERS ({users.length})</Link>
        {auth.id ? (
          <>
            <Link to="/createReview">CREATE REVIEW</Link>
            <button onClick={logout}>LOGOUT {auth.username}</button>
          </>
        ) : (
          <>
            <Link to="/login">Login/Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
              reviews={reviews}
            />
          }
        />
        <Route
          path="/businesses"
          element={
            <Businesses 
              businesses={businesses} 
              token={token}
            />
          }
        />
        <Route 
          path="/users" 
          element={
            <Users 
              users={users} 
              token={token}
            />
          } 
        />
        {
          !!auth.id && 
          <Route 
          path="/createReview" 
          element={
            <CreateReview 
              businesses={businesses} 
            />
          } 
          />
        }
        <Route
          path="/login"
          element={
            <Login
              authAction={authAction}
              auth={auth}
              token={token}
            />
          } 
        />
        <Route
          path="/register"
          element={
            <Register
              authAction={authAction}
              auth={auth}
            />
          } 
        />
        <Route
          path="/business/:id"
          element={
            <SingleBusiness 
              token={token}
            />
          } 
        />
        <Route
          path="/users/:id"
          element={
            <SingleUsers
              token={token}
            />
          } 
        />
        <Route
          path="/business/:id/reviews"
          element={
            <SingleBusiness
              token={token}
            />
          } 
        />
      </Routes>
    </>
  );
}

export default App;
