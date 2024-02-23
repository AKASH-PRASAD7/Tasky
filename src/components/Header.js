import React from "react";

const Header = () => {
  const clockStyle = {
    fontFamily: "digital-clock-font",
  };
  return (
    <>
      <section className="bg-blue-800 h-48 rounded-b-2xl flex justify-center gap-4 flex-col">
        <p className="ml-24 text-white font-mono  font-semibold text-3xl">
          Hello Akash Good Morning 🎯
        </p>

        <p
          style={clockStyle}
          className="ml-24 text-white tracking-widest  text-4xl"
        >
          ⌛ 9:30 AM
        </p>
      </section>
    </>
  );
};

export default Header;
