import { X, SquarePen } from "lucide-react";
import React from "react";

const Task = () => {
  return (
    <>
      <section className="bg-white w-48 flex p-2 flex-col justify-around items-center">
        <p className=" w-full mb-2 flex justify-between ">
          <SquarePen className="cursor-pointer hover:text-blue-500" />
          <X className="cursor-pointer hover:text-red-500" />
        </p>
        <p className="px-2 text-2xl w-full place-items-end flex justify-between font-semibold ">
          Task 1 <span className="text-sm ">🚀</span>
        </p>
        <p className="w-full px-4 text-xs">type</p>
        <p className="text-sm px-4 mb-2 w-full mt-2">
          {" "}
          Combine these classes as needed to achieve the desired text spacing in
          your application. Tailwind CSS is highly customizable, so you can also
          define your own letter spacing and line height values in your
          configuration if needed.{" "}
        </p>
      </section>
    </>
  );
};

const TaskContent = () => {
  return (
    <>
      <section className="mt-8  flex flex-wrap justify-around gap-4">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </section>
    </>
  );
};

export default TaskContent;
