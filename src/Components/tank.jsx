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
    if (dId) {
      const interval = setInterval(() => {
        ShowTankDetails(dId);
      }, 10000);
      return () => clearInterval(interval);
    }
    ShowCardDetails();
  }, [dId]);

  return (
    <div>
      {/* -------------------device card-------------------- */}
      <div>
        {tankDetail.length > 0 ? (
          <div className="h-52 w-full p-4 border-2 mb-10 shadow-md shadow-gray-500">
            {tankDetail.map((data) => (
              <div key={data.device_id} className="text-white  ">
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

      <div className="items-center relative  border-2 border-black flex shadow-md shadow-gray-400 p-4  justify-center">
        <TankCard
          tankDetail={tankDetail}
          myFunction={ShowTankDetails}
          isPower={isPower}
          pump_state={pump_state}
          tankLevel={tankLevel}
          id={dId}
        />
        <div className="absolute bottom-4 right-4" onClick={handleTankDetail}>
          show details
        </div>
      </div>
    </div>
  );
};

export default Tank;
