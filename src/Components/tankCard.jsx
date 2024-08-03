import React from "react";

const TankCard = (props) => {
  return (
    <div>
      <div>
        <div className="relative ">
          <i>
            <strong className="text-3xl text-blue-900">
              Made By Inflection ORG Pvt Ltd
            </strong>
          </i>
          <div>
            {props.isPower === true ? (
              <div className="bg-green-600 absolute top-16 rounded-full w-4 h-4"></div>
            ) : (
              <div className="bg-red-600 absolute top-16 rounded-full w-4 h-4"></div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative bg-blue-300 h-[300px] w-[250px]">
            <div
              className="bg-white border-none"
              style={{ height: `${100 - props.tankLevel}%` }}
            ></div>
            <img
              className="absolute bottom-0 h-full w-full"
              alt="tank"
              src="/tank.png"
            />
          </div>
        </div>
      </div>

      <div className="flex  justify-center items-center gap-2 mt-6">
        {/* -----------on off ------------------------ */}
        <div className="mt-4">
          {!props.pump_state === "on" ? (
            <div
              onClick={() => props.myFunction(props.id, "off")}
              className="shadow-md shadow-gray-600 bg-green-600 mb-4 w-32 h-12 flex justify-center items-center"
            >
              <button>On</button>
            </div>
          ) : (
            <div
              onClick={() => props.myFunction(props.id, "on")}
              className="shadow-md shadow-gray-600 bg-gray-500 text-white mb-4 w-32 h-12 flex justify-center items-center"
            >
              <button>Off</button>
            </div>
          )}
        </div>

        <div className="bg-blue-400 w-48 h-12 flex justify-center items-center">
          {props.tankLevel > 0 ? (
            <p>Show Fill Tank:{props.tankLevel}%</p>
          ) : (
            <p>Show Fill Tank:0%</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TankCard;
