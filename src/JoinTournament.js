import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import "./JoinTournament.css";
import CloseIcon from "@mui/icons-material/Close";
import { closeJoinTournament } from "./features/createOrJoinSlice";
import { useDispatch } from "react-redux";

function JoinTournament() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className="jointournament">
      <div className="jointournament-header">
        <h3>Join Tournament</h3>
        <CloseIcon onClick={() => dispatch(closeJoinTournament())} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="trname"
          placeholder="Team name"
          {...register("trname", { required: true })}
        />
        {errors.trname && (
          <p className="jointournament-error">Name is required!</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="jointournament-error">Password is required!</p>
        )}
        <div className="jointournament-submit">
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </div>
  );
}

export default JoinTournament;
