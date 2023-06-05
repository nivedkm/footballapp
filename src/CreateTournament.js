import React from "react";
import "./CreateTournament.css";
import { useForm } from "react-hook-form";
import { closeCreateTournament } from "./features/createOrJoinSlice";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

function CreateTournament() {
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
    <div className="createtournament">
      <div className="createtournament-header">
        <h3>Create New Tournament</h3>
        <CloseIcon
          className="createtournament-close"
          onClick={() => dispatch(closeCreateTournament())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="trname"
          placeholder="Tournament name"
          {...register("trname", { required: true })}
        />
        {errors.trname && (
          <p className="createtournament-error">Name is required!</p>
        )}

        <input
          type="number"
          name="slots"
          placeholder="Slots"
          {...register("slots", { required: true })}
        />
        {errors.slots && (
          <p className="createtournament-error">Enter number of slots!</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="createtournament-error">Password is required!</p>
        )}
      </form>
    </div>
  );
}

export default CreateTournament;
