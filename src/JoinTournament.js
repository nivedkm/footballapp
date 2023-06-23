import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import "./JoinTournament.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  closeJoinTournament,
  selectSetTournamentNameIsOpen,
} from "./features/createOrJoinSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./Firebase";
import "firebase/compat/firestore";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

function JoinTournament() {
  const tournamentName = useSelector(selectSetTournamentNameIsOpen);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
    const tournamentQuery = query(
      collection(db, "Tournaments"),
      where("tname", "==", tournamentName)
    );

    const tournamentQuerySnapshot = await getDocs(tournamentQuery);
    if (tournamentQuerySnapshot.size === 1) {
      const tournamentDocRef = tournamentQuerySnapshot.docs[0].ref;
      const teamCollectionRef = collection(tournamentDocRef, "teams");
      const teamSnapshot = await getDocs(teamCollectionRef);

      if (teamSnapshot.empty) {
        await setDoc(doc(teamCollectionRef), {
          teamname: formData.tmname,
          email: formData.tmemail,
        });
      } else {
        await addDoc(teamCollectionRef, {
          teamname: formData.tmname,
          email: formData.tmemail,
        });
      }
      dispatch(closeJoinTournament());
    }
  };
  return (
    <div className="jointournament">
      <div className="jointournament-header">
        <h3>Join Tournament</h3>
        <CloseIcon onClick={() => dispatch(closeJoinTournament())} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="tmemail"
          placeholder="Email"
          {...register("tmemail", { required: true })}
        />
        {errors.tmemail && (
          <p className="jointournament-error">Email is required!</p>
        )}
        <input
          type="text"
          name="tmname"
          placeholder="Team name"
          {...register("tmname", { required: true })}
        />
        {errors.tmname && (
          <p className="jointournament-error">Tema Name is required!</p>
        )}

        <div className="jointournament-submit">
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </div>
  );
}

export default JoinTournament;
