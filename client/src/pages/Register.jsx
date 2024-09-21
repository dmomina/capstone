import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";


const Register = ({ auth, authAction}) => {
    return (
        <div>
          {!auth.id ? (
            <>
                <AuthForm authAction={authAction} mode="register" />
            </>
          ) : null}
        </div>
      );
  };

export default Register;