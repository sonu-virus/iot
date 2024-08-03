import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/context";
import { useNavigate, useParams } from "react-router-dom";
import TankCard from "../../Components/tankCard";

const Details = () => {
  const {
    voltage,
    current,
    wifi,
    tNetWork,
    activePower,
    ShowTankDetails,
    pump_state,
    handleFOn,
    version,
    isPower,
    tankLevel,
  } = useContext(AuthContext);
  const param = useParams();
  const navigate = useNavigate();
  const handleSetting = () => {
    navigate("/setting");
  };
  useEffect(() => {
    if (param.id) {
      const interval = setInterval(() => {
        ShowTankDetails(param.id);
      }, 10000);
      console.log("hi");

      // Clear the interval when the component unmounts or param.id changes
      return () => clearInterval(interval);
    }
  }, [param.id]);

  return (
    <div className="p-4 gap-2 w-full">
      <div>
        {/* {(tankLevel > 0 || tankLevel === 100) && ( */}
        <div className="items-center  flex justify-center">
          <div className=" px-2 py-2  ">
            <TankCard
              isPower={isPower}
              myFunction={ShowTankDetails}
              tankLevel={tankLevel}
              pump_state={pump_state}
              id={param.id}
            />
          </div>
        </div>
        {/* )} */}
      </div>
      {/* ------------------------------------------------------ */}
      <div className="flex  justify-center items-center mt-10 ">
        <div className="shadow-md relative  shadow-gray-400 h-[500px] w-[400px] rounded-md">
          <div className="flex justify-center items-center">
            {pump_state === true ? (
              <p className="bg-red-500  py-1.5 px-8 mt-10">Device is fON</p>
            ) : (
              <>
                {!pump_state === true ? (
                  <p className="bg-green-600 py-1.5 px-8 mt-10">
                    Device is runing mode
                  </p>
                ) : (
                  <p className="bg-gray-500  py-1.5 px-8 mt-10">
                    Device is Off
                  </p>
                )}
              </>
            )}
          </div>
          <div className="flex justify-center items-center mt-2">
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-purple-500 flex justify-center items-center px-2 py-1.5 ">
                <div>
                  <p>Voltage</p>
                  <p>{voltage}</p>
                </div>
              </div>
              <div className="bg-purple-500 flex justify-center items-center px-2 py-1.5 ">
                <div>
                  <p>ActivePower</p>
                  <p>{activePower}</p>
                </div>
              </div>
              <div className="bg-purple-500 flex justify-center items-center px-2 py-1.5 ">
                <div>
                  <p>current</p>
                  <p>{current}</p>
                </div>
              </div>
              <div className="bg-purple-500 flex justify-center items-center px-2 py-1.5 ">
                <div>
                  <p>WifiNetwork</p>
                  <p>{wifi}</p>
                </div>
              </div>
              <div className="bg-purple-500 flex justify-center items-center px-2 py-1.5 ">
                <div>
                  <p>tankNetwork</p>
                  <p>{tNetWork}</p>
                </div>
              </div>

              {!pump_state === true ? (
                <div
                  onClick={() => ShowTankDetails(param.id, "off")}
                  className="bg-green-600 border-none flex justify-center items-center py-1.5 rounded-md"
                >
                  <button>On</button>
                </div>
              ) : (
                <button
                  onClick={() => ShowTankDetails(param.id, "on")}
                  className="bg-gray-500 py-1.5 px-4 rounded-md"
                >
                  Off
                </button>
              )}
              <button
                onClick={handleFOn}
                className=" bg-red-500 py-1.5 px-6 rounded-md"
              >
                ForceOn
              </button>
            </div>
          </div>
          <div onClick={handleSetting} className="absolute top-4 right-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <div className="bg-gray-400 px-2 mt-2">
              <p>{version}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
