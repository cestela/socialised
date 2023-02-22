import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo_white.png";
import { client } from "../client";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(decoded));
    const { name, picture, sub } = decoded;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="h-full w-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
