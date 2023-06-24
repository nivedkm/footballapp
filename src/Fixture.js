import { Button } from "@mui/material";
import React from "react";
import "./Fixture.css";

function Fixture({ team1, team2 }) {
  return (
    <div className="fixtures-main">
      <div className="fixtures">
        <div className="fixture-left">
          <p>{team1}</p>
          <input type="number" step="1" min="0" />
        </div>
        <h3>VS</h3>
        <div className="fixture-right">
          <input type="number" step="1" min="0" />
          <p>{team2}</p>
        </div>
      </div>
      <div className="fixtures-submit">
        <Button>SUBMIT RESULT</Button>
      </div>
    </div>
  );
}

export default Fixture;
