import router from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  sessionType: "gi" | "no gi";
  entry: string;
};

const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch("http://localhost:3081/api/entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, user: "skrt" }),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input type="radio" defaultValue="gi" {...register("sessionType")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("entry", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.entry && <span>This field is required</span>}

      <input type="submit" />
    </form>

    // <div>
    //   <h3>Create New Record</h3>
    //   <form onSubmit={onSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="name">Name</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="name"
    //         value={form.name}
    //         onChange={(e) => updateForm({ name: e.target.value })}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="position">Position</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="position"
    //         value={form.position}
    //         onChange={(e) => updateForm({ position: e.target.value })}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <div className="form-check form-check-inline">
    //         <input
    //           className="form-check-input"
    //           type="radio"
    //           name="positionOptions"
    //           id="positionIntern"
    //           value="Intern"
    //           checked={form.level === "Intern"}
    //           onChange={(e) => updateForm({ level: e.target.value })}
    //         />
    //         <label htmlFor="positionIntern" className="form-check-label">
    //           Intern
    //         </label>
    //       </div>

    // </div>
    //     <div className="form-group">
    //       <input
    //         type="submit"
    //         value="Create person"
    //         className="btn btn-primary"
    //       />
    //     </div>
    //   </form>
    // </div>
  );
};

export default Create;
