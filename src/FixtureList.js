import { Button } from "@mui/material";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSetTournamentNameIsOpen } from "./features/createOrJoinSlice";
import { db } from "./Firebase";
import { setTournamentName } from "./features/createOrJoinSlice";
import Fixture from "./Fixture";
import "./FixtureList.css";

function FixtureList() {

  const tournamentName = useSelector(selectSetTournamentNameIsOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewPointtable = () => {
    navigate("/pointtable");
  };

  const [teamArray, setTeamArray] = useState([]);
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    // Retrieve tournamentName from local storage if available
    const storedTournamentName = localStorage.getItem("tournamentName");
    if (storedTournamentName) {
      dispatch(setTournamentName(storedTournamentName));
    }
  }, [dispatch]);

  useEffect(() => {
    // Save tournamentName to local storage
    localStorage.setItem("tournamentName", tournamentName);
  }, [tournamentName]);

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
    fetchData().catch((error) => {
      console.log("Error fetching data:", error);
    });
  }, [tournamentName]);

  useEffect(() => {
    const fetchFixtures = async () => {
      const tournamentQuerySnapshot = await getDocs(
        query(
          collection(db, "Tournaments"),
          where("tname", "==", tournamentName)
        )
      );

      if (tournamentQuerySnapshot.size === 1) {
        const tournamentDocRef = tournamentQuerySnapshot.docs[0].ref;
        const fixturesCollectionRef = collection(tournamentDocRef, "fixtures");

        const fixturesCollectionSnapshot = await getDocs(fixturesCollectionRef);
        const fixturesData = fixturesCollectionSnapshot.docs.map(
          (doc) => doc.data().roundFixtures
        );

        if (fixturesData.length > 0) {
          // If fixtures exist in the database, set them in the state
          const flattenedFixtures = fixturesData.flat();
          setFixtures(flattenedFixtures);
        } else {
          // If no fixtures exist in the database, generate new fixtures
          const generatedFixtures = await generateFixtures();
          const flattenedFixtures = generatedFixtures.flat();
          setFixtures(flattenedFixtures);
        }
      }
    };

    const storeFixturesInDatabase = async (fixtures) => {
      const tournamentQuerySnapshot = await getDocs(
        query(
          collection(db, "Tournaments"),
          where("tname", "==", tournamentName)
        )
      );
      if (tournamentQuerySnapshot.size === 1) {
        const tournamentDocRef = tournamentQuerySnapshot.docs[0].ref;
        const fixturesCollectionRef = collection(tournamentDocRef, "fixtures");

        const fixturesCollectionSnapshot = await getDocs(fixturesCollectionRef);
        const existingFixtures = fixturesCollectionSnapshot.docs.map(
          (doc) => doc.data().roundFixtures
        );

        const newFixtures = fixtures.filter(
          (roundFixtures) =>
            !existingFixtures.includes(JSON.stringify(roundFixtures))
        );

        // Add new fixtures to the collection
        await Promise.all(
          newFixtures.map(async (roundFixtures) => {
            await addDoc(fixturesCollectionRef, { roundFixtures });
          })
        );
      }
    };

    const generateFixtures = async () => {
      const fixtures = [];
      const numTeams = teamArray.length;

      // Create a copy of the teamArray to avoid modifying the original array
      const shuffledTeams = [...teamArray];

      // Shuffle the team order randomly
      for (let i = shuffledTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTeams[i], shuffledTeams[j]] = [
          shuffledTeams[j],
          shuffledTeams[i],
        ];
      }

      for (let i = 0; i < numTeams - 1; i++) {
        const roundFixtures = [];

        // Add the first team against the last team
        roundFixtures.push({
          team1: shuffledTeams[0],
          team2: shuffledTeams[numTeams - 1],
        });

        // Pair up the remaining teams
        for (let j = 1; j < numTeams / 2; j++) {
          roundFixtures.push({
            team1: shuffledTeams[j],
            team2: shuffledTeams[numTeams - j - 1],
          });
        }

        // Rotate the team order for the next round
        const lastTeam = shuffledTeams.pop();
        shuffledTeams.splice(1, 0, lastTeam);

        fixtures.push(roundFixtures);
      }
      await storeFixturesInDatabase(fixtures);
      return fixtures;
    };

    fetchFixtures().catch((error) => {
      console.log("Error fetching fixtures:", error);
    });
  }, [teamArray, tournamentName]);
  console.log("tournamentName:", tournamentName);
  return (
    <div className="fixtures-parent">
      <h2>FIXTURES</h2>
      <h3>{tournamentName}</h3>
      {fixtures.length ===0  ? (<p>Loading Fixtures...</p>):(
        
      fixtures.map((fixture, index) => (
        <Fixture key={index} team1={fixture.team1} team2={fixture.team2} />
      ))
      )}
      <div className="fixtures-pointtable">
        <Button onClick={viewPointtable}>View Point Table</Button>
      </div>
    </div>
  );
}

export default FixtureList;
