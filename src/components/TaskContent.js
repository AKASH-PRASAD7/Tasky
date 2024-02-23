"use client";
import { X, SquarePen } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, task } from "@/Globalredux/userSlice";

const Task = ({ title, type, description }) => {
  return (
    <>
      <section className="bg-white w-48 flex p-2 flex-col justify-around items-center">
        <p className=" w-full mb-2 flex justify-between ">
          <SquarePen className="cursor-pointer hover:text-blue-500" />
          <X className="cursor-pointer hover:text-red-500" />
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
  const dispatch = useDispatch();
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
