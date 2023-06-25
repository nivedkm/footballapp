import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CreateOrJoin.css";
import YourTournaments from "./YourTournaments";
import { useDispatch, useSelector } from "react-redux";
import { openCreateTournament, selectSetTournamentNameIsOpen } from "./features/createOrJoinSlice";
import TournamentJoin from "./TournamentJoin";
import Header from "./Header";
import { db } from "./Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function CreateOrJoin() {
  const [trnmnts, setTrnmnts] = useState([]);

  useEffect(() => {
    const tournamentsRef = query(
      collection(db, "Tournaments"),
      orderBy("tname", "asc")
    );

    const unsubscribe = onSnapshot(tournamentsRef, (snapshot) => {
      setTrnmnts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return () => unsubscribe();
  }, []);
  const dispatch = useDispatch();
  return (
    <div className="createorjoin">
      <div className="create">
        <h4>Create New Tournament</h4>
        <Button
          onClick={() => {
            dispatch(openCreateTournament());
          }}
        >
          Create
        </Button>
      </div>

      <h4 className="join">Join Other Tournaments</h4>
      {trnmnts?.empty && (
        <>
          <p>No available tournaments</p>
        </>
      )}
      {trnmnts.map((tournament) => (
        <TournamentJoin
          tournamentName={tournament.tname}
        
          />
      ))}

      {/* <h4 className="join">Your Tournaments</h4>
      {trnmnts.map((tournament) => (
        <YourTournaments tournamentName={tournament.tname} status="admin" />
      ))} */}
    </div>
  );
}

export default CreateOrJoin;
