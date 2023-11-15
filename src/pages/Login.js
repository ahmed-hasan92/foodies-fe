import React, { useState, useEffect, useContext } from "react";
import ImageCarousel from "./ImageCarousel";
import { checkToken, login } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(loginUsername, loginPassword),
    onSuccess: () => {
      setUser(checkToken());
      navigate("/");
    },
  });

  const handleUsername = (e) => {
    setLoginUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setLoginPassword(e.target.value);
  };

  //--------------------don't read below

  const [imageNames] = useState([
    "meal-1.svg",
    "meal-2.svg",
    "meal-3.svg",
    "meal-4.svg",
    "meal-5.svg",
    "meal-6.svg",
    "meal-7.svg",
    "meal-8.svg",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageNames.length);
    }, 3000); // Change image every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [imageNames.length]);
  //---------------------until here
  return (
    <div className="bg-login-bg bg-cover w-full h-[3251px] pt-[200px]">
      <div className="w-full flex lg:flex-row  md:flex-col sm:flex-col lg:gap-[50px] lg:px-[50px] sm:px-[20px] ">
        <form className="lg:w-1/2 md:w-full sm:w-full p-[50px] flex flex-col justify-center gap-[30px]">
          <div className="w-full flex justify-center">
            <img
              className="w-[200px]"
              src="/assets/logo/foodify-full-logo.svg"
            />
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              placeholder="Enter Your Username"
              type="text"
              id="username"
              name="username"
              onChange={handleUsername}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#910808]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              placeholder="Enter Your Password"
              type="password"
              id="password"
              name="password"
              onChange={handlePassword}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#910808]"
              required
            />
          </div>
          <div className="w-full flex justify-center pt-4">
            {isPending ? (
              <>
                <button
                  type="button"
                  onClick={mutate}
                  className="bg-[#B73232] text-white px-[30px] py-[10px] rounded-full border border-solid-[2px] border-white"
                >
                  loading...
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={mutate}
                className="bg-[#910808] text-white px-[30px] py-[10px] rounded-full border border-solid-[2px] border-white"
              >
                LOGIN
              </button>
            )}
          </div>
          <h1 className="text-center "></h1>
          <div className="flex flex-row gap-4 justify-center">
            <div className="text-white">Not a User?</div>
            <Link
              className="hover:font-bold underline text-white"
              to="/register"
            >
              Register
            </Link>
          </div>
        </form>
        <div className="lg:w-1/2 md:w-full flex flex-row justify-center items-center">
          <div className="w-fit">
            <img
              className="max-w-full min-w-[30px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.50)]"
              src="/assets/login/fork.svg"
            />
          </div>
          <div className="">
            <ImageCarousel
              imageNames={imageNames}
              currentIndex={currentIndex}
            />
          </div>
          <div className="w-fit">
            <img
              className="max-w-full min-w-[30px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.50)]"
              src="/assets/login/spoon.svg"
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:pt-[200px] flex justify-center items-center">
        <img className="w-full" src="/assets/login/login-bottom.svg" />
      </div>
    </div>
  );
};

export default Login;
