"use client";
import { X, SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { task } from "@/Globalredux/userSlice";
import Popup from "./PopUp";

const Task = ({ id, title, type, description }) => {
  const { tasks } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const add = () => {
    setOpen((prev) => !prev);
  };
  const handleDelete = async (id) => {
    const apiUrl = `http://localhost:3000/api/task/`;

    const formData = {
      taskId: id,
    };

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      await fetch(apiUrl, requestOptions);
      const filterTask = tasks.filter((each) => each._id !== id);

      dispatch(task(filterTask));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Popup
        id={id}
        typeOf="Update"
        title1={title}
        type1={type}
        description1={description}
        isOpen={open}
        onClose={add}
      />
      <section className="bg-white w-48 flex p-2 flex-col justify-around items-center">
        <p className=" w-full mb-2 flex justify-between ">
          <SquarePen
            onClick={add}
            className="cursor-pointer hover:text-blue-500"
          />
          <X
            onClick={() => handleDelete(id)}
            className="cursor-pointer hover:text-red-500"
          />
        </p>
        <p className="px-2 text-2xl w-full place-items-end flex justify-between font-semibold ">
          {title}
          <span className="text-sm ">🚀</span>
        </p>
        <p className="w-full px-4 text-xs">{type}</p>
        <p className="text-sm px-4 mb-2 w-full mt-2">{description}</p>
      </section>
    </>
  );
};

const TaskContent = () => {
  const { tasks } = useSelector((state) => state.user);

  return (
    <>
      <section className="mt-8  flex flex-wrap justify-around gap-4">
        {tasks.length === 0 ? (
          <p className="text-center font-semibold text-6xl text-blue-400">
            No task Present
          </p>
        ) : (
          <>
            {tasks?.map((each) => (
              <Task
                id={each._id}
                key={each._id}
                title={each.title}
                type={each.type}
                description={each.description}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default TaskContent;
