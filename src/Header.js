import { Button } from "@mui/material";
import React from "react";
import Avathar from "./Avathar";
import "./Header.css";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useDispatch } from "react-redux";
import { auth } from "./Firebase";
import { logout } from "./features/userSlice";
import headerlogo from "./images/headerlogo.png"

function Header() {
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="header">
      <div className="header-left">
        
       {/*
        <h1>Fixture Maker</h1>
*/     }
      <img src={headerlogo} alt=""/>
      
      </div>
      <div className="header-right">
        <Button onClick={signOut}>
          <p className="header-logout">LogOut</p>
        </Button>
        <Avathar className="header-avatar" />
      </div>
    </div>
  );
}

export default Header;
