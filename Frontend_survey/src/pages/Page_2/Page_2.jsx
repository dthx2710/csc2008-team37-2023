import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../../../db.json";

import { Slider, Brand } from "../../components/index";

const Page_2 = () => {
  const [page2Data, setpage2Data] = useState({});

  const handleSubmit = () => {
    const formData = {
      alcoholUse: page2Data.alcoholUse || "0",
      dustAllergy: page2Data.dustAllergy || "0",
      geneticRisk: page2Data.geneticRisk || "0",
      lungDisease: page2Data.lungDisease || "0",
      diet: page2Data.diet || "0",
      obesity: page2Data.obesity || "0",
      smoking: page2Data.smoking || "0",
      passiveSmoking: page2Data.passiveSmoking || "0",
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
                <div className="w-[30%] h-full bg-blue-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-5 text-[#000] font-medium">
                <span>Internal Factors</span>
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
              Alcohol Use
            </label>
            <Slider
              value={page2Data.alcoholUse}
              setDataValue={(v) => {
                setpage2Data({
                  ...page2Data,
                  alcoholUse: v,
                });
              }}
            />
            <span className="text-black">Level of alcohol use</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="dustAllergy"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Dust Allergy
            </label>
            <Slider
              value={page2Data.dustAllergy}
              setDataValue={(v) => {
                setpage2Data({
                  ...page2Data,
                  dustAllergy: v,
                });
              }}
            />
            <span className="text-black">Level of dust allergy</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="geneticRisk"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Genetic Risk
            </label>
            <Slider
              value={page2Data.geneticRisk}
              setDataValue={(v) => {
                setpage2Data({
                  ...page2Data,
                  geneticRisk: v,
                });
              }}
            />
            <span className="text-black">Level of genetic risk</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="lungDisease"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Chronic Lung Disease
            </label>
            <Slider
              value={page2Data.lungDisease}
              setDataValue={(v) => {
                setpage2Data({
                  ...page2Data,
                  lungDisease: v,
                });
              }}
            />
            <span className="text-black">Level of chronic lung disease</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="diet"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Balanced Diet
            </label>
            <Slider
              value={page2Data.diet}
              setDataValue={(v) => {
                setpage2Data({
                  ...page2Data,
                  diet: v,
                });
              }}
            />
            <span className="text-black">Level of balanced diet</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="diet"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Obesity
            </label>
            <Slider
              value={page2Data.obesity}
              setDataValue={(v) => {
                setpage2Data({
                  ...page2Data,
                  obesity: v,
                });
              }}
            />
            <span className="text-black">Level of obesity</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="diet"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Smoking
            </label>
            <Slider
              value={page2Data.smoking}
              setDataValue={(v) => {
                setpage2Data({
                  ...page2Data,
                  smoking: v,
                });
              }}
            />
            <span className="text-black">Level of smoking</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="diet"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Passive Smoking
            </label>
            <Slider
              value={page2Data.passiveSmoking}
              setDataValue={(v) => {
                setpage2Data({
                  ...page2Data,
                  passiveSmoking: v,
                });
              }}
            />
            <span className="text-black">Level of passive smoking</span>
            <Link to="/part-1">
              <button
                className="mt-3 w-full hover:shadow-htmlForm rounded-md bg-gray-200 py-3 px-8 text-base text-[#000] font-bold outline-none active:scale-[0.99]"
                type="button"
              >
                Back
              </button>
            </Link>
            <Link to="/part-3">
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

export default Page_2;
