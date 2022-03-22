import router from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  sessionType: "gi" | "no gi";
  entry: string;
};

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch("http://localhost:3081/api/entry", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entry: { ...data, user: "skrt" } }),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <select {...register("sessionType")}>
        <option value="gi">gi</option>
        <option value="no gi">no gi</option>
      </select>

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("entry", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.entry && <span>This field is required</span>}

      <input type="submit" value="Submit entry" />
    </form>
  );
};

export default Edit;
