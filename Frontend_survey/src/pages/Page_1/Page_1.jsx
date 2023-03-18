import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../../../db.json";
import { Countries, Brand } from "../../components/index";

const Page_1 = () => {
  const [page1Data, setpage1Data] = useState({});

  const handleSubmit = () => {
    const formData = {
      gender: page1Data.gender || "undefined",
      age: page1Data.age || "0",
      country: page1Data.country || "undefined",
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
              <div className="w-full h-3 bg-gray-200"></div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-5 text-[#000] font-medium">
                <span>Personal Information</span>
              </div>
            </div>
          </div>
        </div>
        <form>
          <div className="mb-5">
            <label
              htmlFor="gender"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Gender
            </label>
            <select
              type="select"
              name="gender"
              id="gender"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mb-2 text-base font-medium text-[#000] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={(e) =>
                setpage1Data({ ...page1Data, gender: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <span className="text-black">Please select your gender</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="age"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder=""
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mb-2 text-base font-medium text-[#000] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={(e) =>
                setpage1Data({ ...page1Data, age: e.target.value })
              }
            />

            <span className="text-black">Please enter your age</span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="country"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Country
            </label>
            <select
              type="select"
              name="country"
              id="country"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mb-2 text-base font-medium text-[#000] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={(e) =>
                setpage1Data({ ...page1Data, country: e.target.value })
              }
            >
              <Countries />
            </select>
            <span className="text-black">Please select your country</span>
            <Link to="/part-2">
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

export default Page_1;
