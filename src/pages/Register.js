import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken, register } from "../api/auth";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(username, password, image),
    onSuccess: () => {
      setUser(checkToken());
      navigate("/");
    },
  });

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUserImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  if (user.password !== user.confirmPassword) {
    alert("Passwords do not match!");
  }

  return (
    <div className="w-full min-h-screen flex bg-[#333333] flex-row pt-[50px]">
      <div className="w-full flex justify-center items-center lg:flex-row  md:flex-col sm:flex-col lg:gap-[50px] lg:pl-[50px] sm:pl-[20px]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col w-1/2 lg:px-[100px] md:px-[50px] sm:px[20px]"
        >
          <div className="w-full flex justify-center">
            <img
              className="w-[200px]"
              src="/assets/logo/foodify-full-logo.svg"
            />
          </div>
          <h1 className="w-full flex justify-center items-center text-white font-bold text-[20px] pt-8 pb-4">
            CREATE AN ACCOUNT
          </h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium mb-2"
            >
              UserName
            </label>
            <input
              placeholder="Enter Your Usename"
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
              placeholder="Enter a Secure Password"
              type="password"
              id="password"
              name="password"
              onChange={handlePassword}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#910808]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              placeholder="Confirm Your Password"
              type="password"
              id="password"
              name="password"
              onChange={handlePassword}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#910808]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-white text-sm font-medium mb-2"
            >
              Profile Image
            </label>
            <input
              type="file" //by default it's text
              id="image"
              name="image" //this will show in console, i can name it anything
              onChange={handleUserImage}
              className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#910808] text-gray-400"
              required
            />
          </div>
          <div className="w-full flex justify-center pt-4">
            {isPending ? (
              <button
                disabled
                className="text-white rounded-full font-bold text-1xl p-2 px-10 bg-[#910808]"
              >
                loading...
              </button>
            ) : (
              <button
                type="submit"
                // onClick={register_mutate} //this will operate this mutationFn: () => register(userInfo) check inspect:Network->(headers,payload,response)
                className="text-white rounded-full font-bold text-1xl p-2 px-10 bg-[#910808]"
              >
                REGISTER
              </button>
            )}
          </div>
          <h1 className="text-red-700 p-5">{error?.message}</h1>
        </form>
        <div className="w-fit h-full items-center flex justify-end">
          <img src="/assets/signup/shelves.svg" />
        </div>
      </div>
    </div>
  );
};

export default Register;
