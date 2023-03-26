import React from "react";

const Steps = () => {
  return (
    <div className="p-8">
      <div className="bg-white p-4 rounded-lg py-8 -mt-6">
        <div className="space-y-12 px-2 xl:px-16 mt-12">
          <div className="mt-4 flex">
            <div>
              <div className="flex items-center h-16 border-l-4 border-blue-600">
                <span className="text-4xl text-blue-600 px-4">1.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-400"></div>
            </div>
            <div>
              <div className="flex items-center h-16">
                <span className="text-lg text-blue-600 font-bold">
                  Quit smoking:
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-500">
                  Smoking is the leading cause of lung cancer, so quitting is
                  crucial. If you don&apos;t smoke, don&apos;t start. If you do
                  smoke, seek help to quit, such as nicotine replacement
                  therapy, medications, or counseling.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex">
            <div>
              <div className="flex items-center h-16 border-l-4 border-blue-600">
                <span className="text-4xl text-blue-600 px-4">2.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-400"></div>
            </div>
            <div>
              <div className="flex items-center h-16">
                <span className="text-lg text-blue-600 font-bold">
                  Avoid secondhand smoke:
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-500">
                  Exposure to secondhand smoke can also increase your risk of
                  lung cancer. Choose smoke-free environments, and ask smokers
                  not to smoke around you.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex">
            <div>
              <div className="flex items-center h-16 border-l-4 border-blue-600">
                <span className="text-4xl text-blue-600 px-4">3.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-400"></div>
            </div>
            <div>
              <div className="flex items-center h-16">
                <span className="text-lg text-blue-600 font-bold">
                  Test your home for radon:
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-500">
                  Radon is a naturally occurring radioactive gas that can
                  increase lung cancer risk, especially in smokers. Test your
                  home for radon and take corrective measures if necessary.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex">
            <div>
              <div className="flex items-center h-16 border-l-4 border-blue-600">
                <span className="text-4xl text-blue-600 px-4">4.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-400"></div>
            </div>
            <div>
              <div className="flex items-center h-22 sm:h-16">
                <span className="text-lg text-blue-600 font-bold">
                  Reduce exposure to occupational hazards:
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-500">
                  If you work in an environment with exposure to asbestos,
                  arsenic, chromium, nickel, or other carcinogenic substances,
                  follow safety precautions and wear protective equipment.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
