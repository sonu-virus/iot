import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/context";
import { setCookie } from "../../utils/setCookie";
import apiClient from "../../utils/apiClient";

const Login = () => {
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.login({ email, password });
      console.log(data);

      const accesTokenExpiresAt = Date.parse(data.access_token_expires_at);
      const refreshTokenExpiresAt = Date.parse(data.refresh_token_expires_at);
      const currentMilies = Date.now();

      const access_token = data.access_token;
      const refresh_token = data.refresh_token;
      setCookie(
        "access_token",
        access_token,
        parseInt((accesTokenExpiresAt - currentMilies) / 1000)
      );
      setCookie(
        "refresh_token",
        refresh_token,
        parseInt((refreshTokenExpiresAt - currentMilies) / 1000)
      );
      apiClient.setAuthHeader("access_token");
      setEmail("");
      setPassword("");
      navigate("/home", { replace: true });
    } catch (err) {
      console.log(err);

      if (err?.response?.data?.message) {
      }
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/", {
        replace: true,
      });
    }
  }, [isLogin]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" bg-blue-500 p-6 shadow-md shadow-gray-500 rounded-md h w-[95%] sm:w-1/2 md:w-1/3">
        <div className="text-center pb-5">
          <div className="flex justify-center items-center pb-2">
            <img src="/logo.svg" alt="logo" />
          </div>
          <h3 className="text-2xl font-semibold">Login to your account</h3>
          <p className="text-sm">Don't have an account yet?&nbsp;</p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleForm}>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Email</label>
            <input
              type="email"
              required
              value={email}
              placeholder="Email Address"
              className="rounded-sm focus:border-accent"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Password</label>
            <input
              required
              type="password"
              value={password}
              placeholder="Password"
              minLength="8"
              className="rounded-sm focus:border-accent"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">
            <p className="text-black">Submit</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
