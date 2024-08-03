import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Details from "./Pages/Details/details";
import { AuthContext } from "./Context/context";
import Setting from "./Pages/Setting/setting";
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "./utils/setCookie";

import apiClient from "./utils/apiClient";
import PrivateRoutes from "./layout/privateRoute";

const App = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(() => {
    const access_token = getCookie("access_token");
    if (access_token == null || access_token.length <= 0) {
      return false;
    }
    apiClient.setAuthHeader("access_token");
    return true;
  });

  const [isPower, setIsPower] = useState(false);
  const [pump_state, setPumpState] = useState(false);
  const [tankLevel, setTankLevel] = useState("");
  const [voltage, setVoltage] = useState("");
  const [activePower, setActivePower] = useState("");
  const [current, setCurrent] = useState("");
  const [tNetWork, setTNetwork] = useState("");
  const [wifi, setWifi] = useState("");
  const [version, setVersion] = useState("");

  const ShowTankDetails = async (id, cmd = "status") => {
    try {
      const { data } = await apiClient.getTankDetails(id, {
        cmd: cmd,
      });

      const tankStatus = data.device_status;
      const tankL = parseInt(data.device_status.tank_level);
      setIsPower(tankStatus.is_power);
      setPumpState(tankStatus.pump_state);
      setTankLevel(tankL);
      setVoltage(tankStatus.voltage);
      setActivePower(tankStatus.active_power);
      setCurrent(tankStatus.current);
      setTNetwork(tankStatus.tank_network_strength);
      setWifi(tankStatus.wifi_network_strength);
      setVersion(tankStatus.firmware_version);
    } catch (err) {
      console.log(err);
    }
  };

  const renewToken = async () => {
    try {
      const { data } = await apiClient.renewAccessToken();
      const access_token = data.access_token;
      setCookie("access_token", access_token);
      apiClient.setAuthHeader("access_token");
      setIsLogin(true);
    } catch (err) {
      console.log(err);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      const accessToken = getCookie("access_token");
      const refreshToken = getCookie("refresh_token");

      if (accessToken || accessToken !== null) {
        return;
      }

      if (refreshToken && refreshToken !== null) {
        apiClient.setAuthHeader("refresh_token");
        renewToken();
        return;
      } else {
        if (isLogin) {
          navigate(0);
        }
      }
    };

    const loginInterval = setInterval(checkLogin, 1000);

    return () => clearInterval(loginInterval);
  }, [isLogin]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        ShowTankDetails,
        isPower,
        pump_state,
        tankLevel,
        voltage,
        current,
        activePower,
        tNetWork,
        wifi,
        version,
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
