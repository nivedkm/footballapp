import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./Firebase";
import "./Header.css";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="header">
      <IconButton onClick={signOut}>
        <Avatar src={user?.photoUrl} />
      </IconButton>
    </div>
  );
}

export default Header;
