import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/context";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import TankCard from "./tankCard";

const Tank = () => {
  const { ShowTankDetails, tankLevel, pump_state, isPower } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [tankDetail, setTankDetail] = useState([]);
  const [dId, setDId] = useState();
  const ShowCardDetails = async () => {
    try {
      const { data } = await apiClient.getTankCardDetails();
      setTankDetail(data);
      const deviceId = data[0].device_id;
      setDId(deviceId);
      ShowTankDetails(deviceId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTankDetail = () => {
    navigate(`/details/${dId}`);
  };

  useEffect(() => {
    ShowCardDetails();
  }, []);

  return (
    <div>
      {/* -------------------device card-------------------- */}
      <div>
        {tankDetail.length > 0 ? (
          <div className="h-52 w-[500px]  border-2 mb-10 shadow-md shadow-gray-500 border-black">
            {tankDetail.map((data) => (
              <div key={data.device_id} className="text-white  p-6">
                <div className="flex justify-between mb-20">
                  <div className="text-black">{data.device_id}</div>
                  <div className="text-black">{data.building}</div>
                  <div className="text-black">{data.device_firmware}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-black">{data.room}</div>
                  <div className="text-black">{data.device_type}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
      {/* -------------------------tank card------------------------------- */}

      <div className="items-center border-2 border-black flex shadow-md shadow-gray-400 px-2 py-2  justify-center">
        <TankCard
          tankDetail={tankDetail}
          myFunction={ShowTankDetails}
          isPower={isPower}
          pump_state={pump_state}
          tankLevel={tankLevel}
          id={dId}
        />
      </div>
      {/* ------------------- */}
      <div className=" relative  h-10 flex justify-center items-center w-full ">
        <div onClick={handleTankDetail} className="absolute right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            color="black"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Tank;
