import { Button } from "@mui/material";
import React from "react";
import "./TournamentJoin.css";

function TournamentJoin({ tournamentName, slots }) {
  return (
    <div className="join">
      <div className="tournaments">
        <p>{tournamentName}</p>
        <p>Slots left - {slots}</p>
        <Button>Join</Button>
      </div>
    </div>
  );
}

export default TournamentJoin;
