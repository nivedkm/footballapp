import React from "react";
import "./CreateTournament.css";
import { useForm } from "react-hook-form";
import { closeCreateTournament } from "./features/createOrJoinSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/base";
import { db } from "./Firebase";
import "firebase/compat/firestore";
import { addDoc, collection } from "firebase/firestore";
  
function CreateTournament() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    console.log(formData);
    const docs = await addDoc(collection(db, "Tournaments"), {
      tname: formData.trname,
      tslots: formData.slots,
    });
    dispatch(closeCreateTournament());
  };
  return (
    <div className="createtournament">
      <div className="createtournament-header">
        <h3>Create New Tournament</h3>
        <CloseIcon onClick={() => dispatch(closeCreateTournament())} />
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
        <div className="createtournament-submit">
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTournament;
