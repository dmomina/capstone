import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";


const Login = ({ auth, authAction}) => {
    return (
        <div>
          {!auth.id ? (
            <>
                <AuthForm authAction={authAction} mode="login" />
            </>
          ) : null}
        </div>
      );
  };

export default Login;