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
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-5">
        <Tank handleLevData={levelData} />
      </div>
    </div>
  );
};

export default Home;
