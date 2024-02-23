"use client";
import { Plus, Home, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import Popup from "./PopUp";
import { useState } from "react";

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const signOut = async () => {
    const apiUrl = `http://localhost:3000/api/auth/signout`;

    const requestOptions = {
      method: "POST",
    };
    await fetch(apiUrl, requestOptions);

    router.push("/signin");
  };

  const add = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <section className="bg-white w-16 h-96 sticky  m-2 mt-8 left-10">
        <Popup typeOf="Add" isOpen={open} onClose={add} />
        <ul className="flex flex-col justify-between h-full items-center p-4">
          <li className="bg-black cursor-pointer  text-3xl rounded-xl">🦆</li>
          <li
            onClick={add}
            className="hover:bg-slate-300 cursor-pointer mt-8 text-2xl p-1 font-bold rounded-lg"
          >
            <Plus />
          </li>
          <li className="cursor-pointer hover:bg-slate-300 text-2xl p-1  mt-2 font-bold rounded-lg">
            <Home />
          </li>
          <li className="cursor-pointer hover:bg-slate-300 text-2xl p-1 mt-2  font-bold rounded-lg">
            <Bell />
          </li>
          <li
            onClick={signOut}
            className="cursor-pointer hover:bg-slate-300 text-2xl p-1 mt-24  font-bold rounded-lg"
          >
            <LogOut />
          </li>
        </ul>
      </section>
    </>
  );
};

export default SideNav;
