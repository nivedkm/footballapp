import React from 'react'
import "./CreateTournament.css"
import { useForm } from "react-hook-form";

function CreateTournament() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  return (
    <div className='createtournament'>
      
    </div>
  )
}

export default CreateTournament