import React from "react";

const Brand = () => {
  return (
    <div className="mb-5">
      <div className="flex h-[150px] bg-gray-600 justify-end relative">
        <h1 className="text-[18px] sm:text-[28px]  font-bold text-[#fff] ml-4 mb-16 absolute left-0 top-12 sm:left-0 sm:top-8">
          Lung Cancer Risk <br /> Assessment
        </h1>
        <div className="flex w-[150px] sm:w-[200px] justify-center overflow-hidden relative">
          <span className="text-4xl font-bold text-white">
            <img
              src="/header-lung.png"
              alt=""
              className="-mr-10 w-full absolute right-0 object-cover h-full"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Brand;
