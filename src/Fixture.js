import { Button } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSetTournamentNameIsOpen } from "./features/createOrJoinSlice";
import { db } from "./Firebase";
import "./Fixture.css";

function Fixture({ team1, team2 }) {
  const tournamentName = useSelector(selectSetTournamentNameIsOpen);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [submittedFixtures, setSubmittedFixtures] = useState([]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    // Check if the fixture has been submitted
    const isFixtureSubmitted = submittedFixtures.some(
      (fixture) => fixture.team1 === team1 && fixture.team2 === team2
    );

    // Update the input values only for unsubmitted fixtures
    if (!isFixtureSubmitted) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [id]: parseInt(value),
      }));
    }
  };

  const handleSubmitResult = async () => {
    setIsSubmitting(true)
    const team1Score = inputValues[`${team1}_${team2}_team1Score`] || 0;
    const team2Score = inputValues[`${team1}_${team2}_team2Score`] || 0;

    const fixtureData = {
      team1: team1,
      team2: team2,
      team1Score: team1Score,
      team2Score: team2Score,
    };

    let team1Points = 0;
    let team2Points = 0;
    let team1GoalDifference = team1Score - team2Score;
    let team2GoalDifference = team2Score - team1Score;
    if (team1Score > team2Score) {
      team1Points = 3;
    } else if (team2Score > team1Score) {
      team2Points = 3;
    } else {
      team1Points = 1;
      team2Points = 1;
    }

    const tournamentQuery = query(
      collection(db, "Tournaments"),
      where("tname", "==", tournamentName)
    );
    const tournamentQuerySnapshot = await getDocs(tournamentQuery);
    if (tournamentQuerySnapshot.size === 1) {
      const tournamentDocRef = tournamentQuerySnapshot.docs[0].ref;
      const pointTableRef = collection(tournamentDocRef, "pointtable");

      const team1EntryRef = doc(pointTableRef, team1);
      const team2EntryRef = doc(pointTableRef, team2);
      const [team1Doc, team2Doc] = await Promise.all([
        getDoc(team1EntryRef),
        getDoc(team2EntryRef),
      ]);

      const updateTeamPoints = async (teamRef, teamScore, opponentScore) => {
        const teamSnapshot = await getDoc(teamRef);
        const teamData = teamSnapshot.exists()
          ? teamSnapshot.data()
          : {
              teamName: teamRef.id,
              matches: 0,
              won: 0,
              lost: 0,
              draw: 0,
              points: 0,
              goalDifference: 0,
            };

        const teamPoints =
          teamScore > opponentScore ? 3 : teamScore < opponentScore ? 0 : 1;
        const teamGoalDifference = teamScore - opponentScore;

        await setDoc(teamRef, {
          ...teamData,
          matches: teamData.matches + 1,
          teamName: teamData.teamName,
          won: teamData.won + (teamScore > opponentScore ? 1 : 0),
          lost: teamData.lost + (teamScore < opponentScore ? 1 : 0),
          draw: teamData.draw + (teamScore === opponentScore ? 1 : 0),
          points: teamData.points + teamPoints,
          goalDifference: teamData.goalDifference + teamGoalDifference,
        });
      };

      await updateTeamPoints(team1EntryRef, team1Score, team2Score);
      await updateTeamPoints(team2EntryRef, team2Score, team1Score);
      const updatedFixtures = [...submittedFixtures, fixtureData];
      setSubmittedFixtures(updatedFixtures);
      setIsSubmitted(true);
      setIsSubmitting(false)
    }

    const fixtureDocRef = doc(
      collection(db, "Tournaments", tournamentName, "fixtures"),
      `${team1}_${team2}`
    );

    await setDoc(fixtureDocRef, fixtureData);

    const updatedFixtureData = {
      team1,
      team2,
      team1Score,
      team2Score,
    };

    const updatedFixtures = [...submittedFixtures, updatedFixtureData];
    setSubmittedFixtures(updatedFixtures);
    setIsSubmitted(true);
  };

  useEffect(() => {
    const fetchSubmittedFixtures = async () => {
      const fixtureDocRef = doc(
        collection(db, "Tournaments", tournamentName, "fixtures"),
        `${team1}_${team2}`
      );

      const fixtureDocSnapshot = await getDoc(fixtureDocRef);

      if (fixtureDocSnapshot.exists()) {
        const fixtureData = fixtureDocSnapshot.data();
        setSubmittedFixtures([fixtureData]);
        setIsSubmitted(true);
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [`${team1}_${team2}_team1Score`]: fixtureData.team1Score,
          [`${team1}_${team2}_team2Score`]: fixtureData.team2Score,
        }));
      }
    };

    fetchSubmittedFixtures();
  }, [tournamentName, team1, team2]);

  return (
    <div className="fixtures-main">
      <div className="fixtures">
        <div className="fixture-left">
          <p>{team1}</p>
          <input
            type="number"
            step="1"
            min="0"
            value={inputValues[`${team1}_${team2}_team1Score`] || 0}
            id={`${team1}_${team2}_team1Score`}
            onChange={handleInputChange}
            disabled={isSubmitted}
            className={isSubmitted ? "disabled-input" : ""}
          />
        </div>
        <h3>VS</h3>
        <div className="fixture-right">
          <input
            type="number"
            step="1"
            min="0"
            value={inputValues[`${team1}_${team2}_team2Score`] || 0}
            id={`${team1}_${team2}_team2Score`}
            onChange={handleInputChange}
            disabled={isSubmitted}
            className={isSubmitted ? "disabled-input" : ""}
          />
          <p>{team2}</p>
        </div>
      </div>
      <div className="fixtures-submit">
        {isSubmitting ? ( // Display 'Submitting' when isSubmitting is true
          <Button disabled={true} className="disabled-button">
            Submitting...
          </Button>
        ) : isSubmitted ? (
          <Button disabled={true} className="disabled-button">
            SUBMITTED
          </Button>
        ) : (
          <Button onClick={handleSubmitResult}>SUBMIT RESULT</Button>
        )}
      </div>
    </div>
  );
}

export default Fixture;
