import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import FixtureList from "./FixtureList";
import { useNavigate } from "react-router-dom";

import { db } from "./Firebase";
import "./TournamentJoin.css";
import { useDispatch } from "react-redux";
import {
  openJoinTournament,
  setTournamentName,
} from "./features/createOrJoinSlice";
import { collection, getDocs, query, where } from "firebase/firestore";

function TournamentJoin({ tournamentName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [slotsLeft, setSlotsLeft] = useState(0);
  const tournamentQuery = query(
    collection(db, "Tournaments"),
    where("tname", "==", tournamentName)
  );
  useEffect(() => {
    const fetchData = async () => {
      const tournamentQuerySnapshot = await getDocs(tournamentQuery);
      if (tournamentQuerySnapshot.size === 1) {
        const tournamentDocRef = tournamentQuerySnapshot.docs[0].ref;
        const teamCollectionRef = collection(tournamentDocRef, "teams");
        const teamSnapshot = await getDocs(teamCollectionRef);

        const tournamentData = tournamentQuerySnapshot.docs[0].data();
        const tslots = tournamentData.tslots;
        const curentTeamCount = teamSnapshot.size;
        const cslotsLeft = tslots - curentTeamCount;
        setSlotsLeft(cslotsLeft);
      }
    };
    fetchData();
  }, [tournamentQuery]);
  useEffect(() => {
    localStorage.removeItem("tournamentName");
  }, []);

  const handleClick = () => {
    dispatch(openJoinTournament());
    dispatch(setTournamentName(tournamentName));
  };
  const handleClickFixtureList = () => {
    dispatch(setTournamentName(tournamentName));
    navigate("/fixtures");
  };
  return (
    <div className="join">
      <div className="tournaments">
        <div className="tournament-name">
          <p>{tournamentName}</p>
        </div>
        <div className="tournament-slots">
          <p>
            {slotsLeft === 0 ? <>Slot Full</> : "Slots left - " + slotsLeft}
          </p>
        </div>

        <div className="tournament-button">
          {slotsLeft > 0 ? (
            <Button onClick={handleClick}>Join</Button>
          ) : (
            <Button onClick={handleClickFixtureList}>Fixtures</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TournamentJoin;
