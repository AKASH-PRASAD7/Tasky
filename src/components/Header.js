"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, task } from "@/Globalredux/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);

  const getUserDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/task/");
      const data = await res.json();
      if (!data.success) {
        dispatch(task([]));
      } else {
        dispatch(task(data?.tasks));
      }
      dispatch(addUser(data?.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  function getTimeOfDay() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      return "Morning";
    } else if (hours >= 12 && hours < 17) {
      return "Afternoon";
    } else if (hours >= 17 && hours < 20) {
      return "Evening";
    } else {
      return "Night";
    }
  }
  function getCurrentTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }
  const clockStyle = {
    fontFamily: "digital-clock-font",
  };
  return (
    <>
      <section className="bg-blue-800 h-48 rounded-b-2xl flex justify-center gap-4 flex-col">
        {name && (
          <p className="ml-24 text-white font-mono  font-semibold text-3xl">
            Hello {name} Good {getTimeOfDay()} 🎯
          </p>
        )}

        <p
          style={clockStyle}
          className="ml-24 text-white tracking-widest  text-4xl"
        >
          ⌛ {getCurrentTime()}
        </p>
      </section>
    </>
  );
};

export default Header;
