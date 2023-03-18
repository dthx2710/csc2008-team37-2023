import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center relative">
      <div className="flex flex-row h-20px justify-end absolute top-0 right-0">
        <button className="bg-gray-300 rounded-md px-2 py-1 m-4 active:scale-[0.98] font-medium">
          Admin Login
        </button>
      </div>
      <section class="pt-48 sm:pt-80 bg-white" style={{marginTop: "-100px"}}>
        <div class="flex flex-col px-8 mx-auto max-w-7xl xl:px-12">
          <div class="flex flex-col animated fadeIn sm:flex-row">
            <div class="flex items-center mb-4 sm:w-1/2 md:w-5/12 sm:order-last">
              <img class="rounded-lg shadow-xl" src="/bg.png" alt="" />
            </div>
            <div class="flex flex-col justify-center mt-5 mb-4 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
              <p class="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">
                Medical Survey
              </p>
              <h3 class="mt-2 text-2xl sm:text-left md:text-4xl font-bold">
                Lung Cancer Risk Assessment
              </h3>
              <p class="mt-5 text-lg text-gray-700 text md:text-left">
                This survey is designed to help you assess your risk of lung
                cancer. It will take you about 5 minutes to complete.
              </p>
            </div>
          </div>
          <div className="flex justify-start lg:-mt-16">
            <Link to="/part-1">
              <button className="transform rounded-md bg-blue-500 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700 active:scale-[0.99]">
                Start Survey
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
