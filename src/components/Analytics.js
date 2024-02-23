import React from "react";
import DatePicker from "./DatePicker";
import Graph from "./Graph";
import Map from "./Map";

const Analytics = () => {
  return (
    <>
      <section className="fixed h-96 flex flex-col justify-between top-10 right-2 ">
        <DatePicker />
        <Graph />

        <Map />
      </section>
    </>
  );
};

export default Analytics;
