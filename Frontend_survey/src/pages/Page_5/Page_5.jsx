import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../../../db.json";
import { Brand, Steps } from "../../components/index";

import { AiOutlineInfoCircle } from "react-icons/ai";

const Page_5 = () => {
  const surveyData = data.data;

  const [riskLevel, setRiskLevel] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
	setRiskLevel("High");
    if (riskLevel == "Low") {
      setColor("#00FF00");
    } 
	else if (riskLevel == "Medium") {
      setColor("#FFFF00");
    } 
	else {
      setColor("#FF0000");
    }
  }, [riskLevel]);

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="mx-auto max-w-[1450px]">
        <div>
          <Brand />
          <div>
            <div className="flex items-center justify-center mb-5">
              <div className="w-full h-3 bg-gray-200">
                <div className="w-full h-full bg-blue-500"></div>
              </div>
            </div>
            <div class="flex justify-between h-full w-full">
              <div class="h-full flex items-start justify-start">
                <div class="w-full h-full flex flex-col items-left justify-start mt-2 mr-2">
                  <div className="border shadow-md rounded-[50%]">
                    <AiOutlineInfoCircle size={100} color={color} />
                  </div>
                </div>
              </div>
              <div class="h-full flex items-start justify-start mt-2 text-justify">
                <div class="w-full h-full flex flex-col items-left justify-start ml-1">
                  <h3 className="text-lg font-bold text-blue-800 uppercase">
                    Your Risk:
                    <span
                      className={`${
                        riskLevel === "Low"
                          ? "text-green-500"
                          : riskLevel === "Medium"
                          ? "text-yellow-500"
                          : "text-red-500"
                      } ml-2`}
                    >
                      {riskLevel}
                    </span>
                  </h3>
                  <p className="font-[500]">
                    Lung cancer is a type of cancer that starts in the lungs and can spread to other parts of the body. It is the leading cause of cancer-related deaths worldwide, with smoking being the most significant risk factor.
                    Read on for ways to reduce the risk of lung cancer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Steps />
    </div>
  );
};

export default Page_5;