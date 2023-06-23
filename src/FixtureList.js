import { Button } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSetTournamentNameIsOpen } from "./features/createOrJoinSlice";
import { db } from "./Firebase";
import Fixture from "./Fixture";
import "./FixtureList.css";

function FixtureList() {
  const tournamentName = useSelector(selectSetTournamentNameIsOpen);
  const navigate = useNavigate();
  const viewPointtable = () => {
    navigate("/pointtable");
  };
  const [teamArray, setTeamArray] = useState([]);
  const [fixtures,setFixtures] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const tournamentQuery = query(
        collection(db, "Tournaments"),
        where("tname", "==", tournamentName)
      );
      const tournamentQuerySnapshot = await getDocs(tournamentQuery);
      if (tournamentQuerySnapshot.size === 1) {
        const tournamentDocRef = tournamentQuerySnapshot.docs[0].ref;
        const teamCollectionRef = collection(tournamentDocRef, "teams");
        const teamSnapshot = await getDocs(teamCollectionRef);
        const teams = teamSnapshot.docs.map((doc) => doc.data());
        const teamNames = teams.map((team) => team.teamname);
        setTeamArray(teamNames);
      }
    };
    fetchData();
  }, [tournamentName]);
  useEffect(()=>{

    const generateFixtures = () => {
      const fixtures = [];
      const numTeams = teamArray.length;
  
      for (let i = 0; i < numTeams-1; i++) {
        for (let j = i + 1; j < numTeams; j++) {
          fixtures.push(
            <Fixture
              key={`${teamArray[i]}-${teamArray[j]}`}
              team1={teamArray[i]}
              team2={teamArray[j]}
            />
          );
        }
      }
      console.log(fixtures);
      return fixtures;
    };
    const renderedFixtures = generateFixtures();
    setFixtures(renderedFixtures)
  },[teamArray])
  return (
    <div className="fixtures-parent">
      <h2>FixtureList</h2>
      <h3>{tournamentName}</h3>
      {fixtures}

      <div className="fixtures-pointtable">
        <Button onClick={viewPointtable}>View Point Table</Button>
      </div>
    </div>
  );
}

export default FixtureList;
