import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { openJoinTournament } from "./features/createOrJoinSlice";
import "./TournamentJoin.css";

function TournamentJoin({ tournamentName, slots }) {
    const dispatch  = useDispatch()
  return (
    <div className="join">
      
      <div className="tournaments">
        <p>{tournamentName}</p>
        <p>Slots left - {slots}</p>
        <Button onClick={()=> dispatch(openJoinTournament())}>Join</Button>
      </div>
    </div>
  );
}

export default TournamentJoin;
