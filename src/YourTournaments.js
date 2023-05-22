import { Button } from "@mui/material";
import React from "react";
import "./YourTournaments.css";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

function YourTournaments({ tournamentName, status }) {
  return (
    <div className="your">
      <div className="your-tournaments">
        <Button>
          <p>{tournamentName}</p>
          {status === "admin" ? (
            <SupervisorAccountIcon />
          ) : (
            <SportsSoccerIcon />
          )}
        </Button>
      </div>
    </div>
  );
}

export default YourTournaments;
