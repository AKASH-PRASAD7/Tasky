import { Plus, Home, Bell, LogOut } from "lucide-react";

const SideNav = () => {
  return (
    <>
      <section className="bg-white w-16 h-96 sticky  m-2 mt-8 left-10">
        <ul className="flex flex-col justify-between h-full items-center p-4">
          <li className="bg-black cursor-pointer  text-3xl rounded-xl">🦆</li>
          <li className="bg-slate-300 cursor-pointer mt-8 text-2xl p-1 font-bold rounded-lg">
            <Plus />
          </li>
          <li className="cursor-pointer text-2xl p-1  mt-2 font-bold rounded-lg">
            <Home />
          </li>
          <li className="cursor-pointer text-2xl p-1 mt-2  font-bold rounded-lg">
            <Bell />
          </li>
          <li className="cursor-pointer text-2xl p-1 mt-24  font-bold rounded-lg">
            <LogOut />
          </li>
        </ul>
      </section>
    </>
  );
};

export default SideNav;
