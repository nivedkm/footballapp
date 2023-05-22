import { Button } from "@mui/material";
import React from "react";
import "./CreateOrJoin.css";
import YourTournaments from "./YourTournaments";
import { useDispatch } from "react-redux";
import { openCreateTournament } from "./features/createOrJoinSlice";
import TournamentJoin from "./TournamentJoin";

function CreateOrJoin() {

  const dispatch = useDispatch();
  //tesitng2
  return (
    <div className="createorjoin">
      <div className="create">
        <h4>Create new tournament</h4>
        <Button onClick={() => dispatch(openCreateTournament())}>Create</Button>
      </div>

      <h4>Join other tournaments</h4>
      <TournamentJoin tournamentName="Tournament 1" slots={3} />
      <TournamentJoin tournamentName="Tournament 2" slots={8} />

      <h4>Your tournaments</h4>
      <YourTournaments tournamentName="Tournament 1" status="admin" />
      <YourTournaments tournamentName="Tournament 1" status="participant" />
    </div>
  );
}

export default CreateOrJoin;
