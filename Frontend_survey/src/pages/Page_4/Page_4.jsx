import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../../../db.json";

import { Slider, Brand } from "../../components/index";

const Page_4 = () => {
  const [page4Data, setpage4Data] = useState({});

  const handleSubmit = () => {
    const formData = {
      chestPain: page4Data.chestPain || "0",
      coughBlood: page4Data.coughBlood || "0",
      fatigue: page4Data.fatigue || "0",
      weightLoss: page4Data.weightLoss || "0",
      breathShortness: page4Data.breathShortness || "0",
      wheezing: page4Data.wheezing || "0",
      swallowingDifficulties: page4Data.swallowingDifficulties || "0",
      fingerNails: page4Data.fingerNails || "0",
      coldFrequency: page4Data.coldFrequency || "0",
      coughFrequency: page4Data.coughFrequency || "0",
      snoringFrequency: page4Data.snoringFrequency || "0",
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
                <div className="w-[85%] h-full bg-blue-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-5 text-[#000] font-medium">
                <span>Symptoms</span>
              </div>
            </div>
          </div>
        </div>
        <form>
          <div className="mb-5">
            <label
              htmlFor="chestPain"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Chest Pain
            </label>
            <Slider
              value={page4Data.chestPain}
              setDataValue={(v) => setpage4Data({ ...page4Data, chestPain: v })}
            />
            <span className="text-gray-500">Level of chest pain</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="coughBlood"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Coughing of blood
            </label>
            <Slider
              value={page4Data.coughBlood}
              setDataValue={(v) =>
                setpage4Data({ ...page4Data, coughBlood: v })
              }
            />
            <span className="text-gray-500">Level of coughing of blood</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="fatigue"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Fatigue
            </label>
            <Slider
              value={page4Data.fatigue}
              setDataValue={(v) => setpage4Data({ ...page4Data, fatigue: v })}
            />
            <span className="text-gray-500">Level of fatigue</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="weightLoss"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Weight Loss
            </label>
            <Slider
              value={page4Data.weightLoss}
              setDataValue={(v) =>
                setpage4Data({ ...page4Data, weightLoss: v })
              }
            />
            <span className="text-gray-500">Level of weight loss</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="breathShortness"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Shortness of Breath
            </label>
            <Slider
              value={page4Data.breathShortness}
              setDataValue={(v) =>
                setpage4Data({ ...page4Data, breathShortness: v })
              }
            />
            <span className="text-gray-500">Level of shortness of breath</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="wheezing"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Wheezing
            </label>
            <Slider
              value={page4Data.wheezing}
              setDataValue={(v) => setpage4Data({ ...page4Data, wheezing: v })}
            />
            <span className="text-gray-500">Level of wheezing</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="swallowingDifficulties"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Swallowing Difficulties
            </label>
            <Slider
              value={page4Data.swallowingDifficulties}
              setDataValue={(v) =>
                setpage4Data({ ...page4Data, swallowingDifficulties: v })
              }
            />
            <span className="text-gray-500">
              Level of swallowing difficulties
            </span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="fingerNails"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Chubbing of Finger Nails
            </label>
            <Slider
              value={page4Data.fingerNails}
              setDataValue={(v) =>
                setpage4Data({ ...page4Data, fingerNails: v })
              }
            />
            <span className="text-gray-500">
              Level of chubbing of finger nails
            </span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="coldFrequency"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Cold
            </label>
            <Slider
              value={page4Data.coldFrequency}
              setDataValue={(v) =>
                setpage4Data({ ...page4Data, coldFrequency: v })
              }
            />
            <span className="text-gray-500">Level of frequency of cold</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="coughFrequency"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Dry Cough
            </label>
            <Slider
              value={page4Data.coughFrequency}
              setDataValue={(v) =>
                setpage4Data({ ...page4Data, coughFrequency: v })
              }
            />
            <span className="text-gray-500">
              Level of frequency of dry cough
            </span>
          </div>

          <div className="mb-5">
            <label
              htmlFor="snoringFrequency"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Snoring
            </label>
            <Slider
              value={page4Data.snoringFrequency}
              setDataValue={(v) =>
                setpage4Data({ ...page4Data, snoringFrequency: v })
              }
            />
            <span className="text-gray-500">Level of frequency of snoring</span>
            <Link to="/part-3">
              <button
                className="mt-3 w-full hover:shadow-htmlForm rounded-md bg-gray-200 py-3 px-8 text-base text-[#000] font-bold outline-none active:scale-[0.99]"
                type="button"
              >
                Back
              </button>
            </Link>
            <Link to="/part-5">
              <button
                className="mt-3 w-full hover:shadow-htmlForm rounded-md bg-gray-200 py-3 px-8 text-base text-[#000] font-bold outline-none active:scale-[0.99]"
                type="button"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page_4;
