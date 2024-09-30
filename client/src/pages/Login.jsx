import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";


const Login = ({ auth, authAction}) => {
    return (
        <div>
          {!auth.id ? (
            <>
                <AuthForm authAction={authAction} mode="login" />
            </>
          ) : null}
          {!auth.id ? (
            <Link to="/register">Or Create an Account</Link>
          ) : null}
        </div>
      );
  };

export default Login;