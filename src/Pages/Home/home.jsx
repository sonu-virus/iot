import React, { useEffect } from "react";
import Tank from "../../Components/tank";
import { useState } from "react";
const Home = () => {
  const [levelData, setLevelData] = useState(40);
  const handleLevData = () => {
    const lEl = 100 - levelData;
    setLevelData(lEl);
  };
  useEffect(() => {
    handleLevData();
  }, []);
  return (
    <div className="flex justify-center  mx-10 items-center min-h-screen">
      <div className="w-full ">
        <Tank handleLevData={levelData} />
      </div>
    </div>
  );
};

export default Home;
