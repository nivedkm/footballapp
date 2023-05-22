import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Fixture from "./Fixture";
import "./FixtureList.css";

function FixtureList() {

  const navigate = useNavigate()
  const viewPointtable = () => {
    navigate('/pointtable')
  }

  return (
    <div className="fixtures-parent">
      <h2>FixtureList</h2>
      <Fixture team1="Team 1" team2="Team 2" />
      <Fixture team1="Team 3" team2="Team 4" />
      <Fixture team1="Team 5" team2="Team 6" />

      <div className="fixtures-pointtable">
        <Button onClick={viewPointtable}>View Point Table</Button>
      </div>
    </div>
  );
}

export default FixtureList;
