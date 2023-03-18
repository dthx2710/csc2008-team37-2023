import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../../../db.json";

import { Slider, Brand } from "../../components/index";

const Page_3 = () => {
  const [page3Data, setpage3Data] = useState({});

  const handleSubmit = () => {
    const formData = {
      occupationalHazard: page3Data.occupationalHazard || "0",
      airPollutionExposure: page3Data.airPollutionExposure || "0",
    };
    const existingData = data.data;
    const newData = { ...existingData, ...formData };
    axios
      .put("https://cancerapp.onrender.com/data", newData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <div>
          <Brand />
          <div>
            <div className="flex items-center justify-center mb-5">
              <div className="w-full h-3 bg-gray-200">
                <div className="w-[60%] h-full bg-blue-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-5 text-[#000] font-medium">
                <span>External Factors</span>
              </div>
            </div>
          </div>
        </div>
        <form>
          <div className="mb-5">
            <label
              htmlFor="alcoholUse"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Occupational Hazards
            </label>
            <Slider
              value={page3Data.occupationalHazard}
              setDataValue={(v) => {
                setpage3Data({
                  ...page3Data,
                  occupationalHazard: v,
                });
              }}
            />
            <span className="text-black">Level of occupational hazards</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="diet"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Air Pollution Exposure
            </label>
            <Slider
              value={page3Data.airPollutionExposure}
              setDataValue={(v) => {
                setpage3Data({
                  ...page3Data,
                  airPollutionExposure: v,
                });
              }}
            />
            <span className="text-black">Level of air pollution exposure</span>
            <Link to="/part-2">
              <button
                className="mt-3 w-full hover:shadow-htmlForm rounded-md bg-gray-200 py-3 px-8 text-base text-[#000] font-bold outline-none active:scale-[0.99]"
                type="button"
              >
                Back
              </button>
            </Link>
            <Link to="/part-4">
              <button
                className="mt-3 w-full hover:shadow-htmlForm rounded-md bg-gray-200 py-3 px-8 text-base text-[#000] font-bold outline-none active:scale-[0.99]"
                type="button"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Next
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page_3;
