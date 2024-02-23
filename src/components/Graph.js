"use client";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const Graph = () => {
  return (
    <>
      <section>
        <BarChart
          xAxis={[{ scaleType: "band", data: ["Task 1", "Task2", "Task 3"] }]}
          series={[{ data: [4, 3, 5] }]}
          width={300}
          height={300}
          className="bg-white"
        />
      </section>
    </>
  );
};

export default Graph;
