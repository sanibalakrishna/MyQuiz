import React, { useState } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/celebrate.json";
import animation from "../assets/result.json";

function Result() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const report = params.get("report");
  const total = params.get("total");
  const tempreport: any = report && parseInt(report);
  const temptotal: any = total && parseInt(total);
  const tempresult: any =
    tempreport != null && temptotal != null && tempreport / temptotal;

  return (
    <div className=" h-screen w-screen bg-[#860da2] flex justify-center ">
      <Lottie
        animationData={animationData}
        loop={false}
        style={{ zIndex: "1000px" }}
      />
      <div className="flex justify-center absolute top-0">
        <Lottie animationData={animation} loop={true} />
      </div>
      <div className="flex justify-center absolute bottom-20">
        <div className="flex flex-col">
          <div>
            <h1 className="font-semibold font-mono text-white md:text-3xl">
              {" "}
              Result
            </h1>
          </div>

          <div>
            <h1 className="text-center">{report + "/" + total}</h1>
          </div>
          <div>
            <h1 className="text-center  text-[#2bee5f]">
              {tempresult * 100 + "%"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
