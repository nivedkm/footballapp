import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./Firebase";
import "./Avathar.css";

function Avathar() {
  const user = useSelector(selectUser);
 
  return (
    <div className="header">
      
        <Avatar className="avatar" src={user?.photoUrl} />
    </div>
  );
}

export default Avathar;
