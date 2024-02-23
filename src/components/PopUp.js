"use client";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { task } from "@/Globalredux/userSlice";

const Popup = ({
  typeOf,
  isOpen,
  onClose,
  id = "",
  title1 = "",
  type1 = "",
  description1 = "",
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  // const[open,setOpen]=useState(isOpen)

  useEffect(() => {
    setTitle(title1);
    setType(type1);
    setDescription(description1);
  }, [title1, type1, description1]);

  const handleUpdate = async (id, title1, type1, description1) => {
    const apiUrl = `http://localhost:3000/api/task/`;

    const formData = {
      taskId: id,
      title,

      description,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      if (data?.success) {
        const res = await fetch("http://localhost:3000/api/task/");
        const data = await res.json();
        if (!data.success) {
          dispatch(task([]));
        } else {
          dispatch(task(data?.tasks));
        }
      }
      setTitle("");
      setType("");
      setDescription("");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typeOf === "Update") {
      handleUpdate(id, title1, type1, description1);
    }

    //Adding task
    if (typeOf === "Add") {
      const apiUrl = `http://localhost:3000/api/task/`;

      const formData = {
        title,
        type,
        description,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (data?.success) {
          const res = await fetch("http://localhost:3000/api/task/");
          const data = await res.json();
          if (!data.success) {
            dispatch(task([]));
          } else {
            dispatch(task(data?.tasks));
          }
        }
        setTitle("");
        setType("");
        setDescription("");
        onClose();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="z-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{typeOf} task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              className={`mt-1 p-2 w-full border rounded-md `}
              required={typeOf === "Add"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {typeOf === "Add" && (
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-600"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                className="mt-1 p-2 w-full border rounded-md"
                value={type}
                required={typeOf === "Add"}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="mt-1 p-2 w-full border rounded-md"
              value={description}
              required={typeOf === "Add"}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-white bg-gray-500 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
