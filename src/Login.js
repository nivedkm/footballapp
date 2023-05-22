import { Button } from "@mui/base";
import React from "react";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "./Firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth.signInWithPopup(provider).then(({ user }) => {
      dispatch(
        login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        })
      );
    });
  };
  return (
    <div className="login">
      <h1>Football</h1>
      <Button onClick={signIn} className="login-button">
        <p>SignIn with Google</p>
        <p>
          <GoogleIcon />
        </p>
      </Button>
    </div>
  );
}

export default Login;
