import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkToken } from "./api/auth";
import React from "react";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import UserContext from "./context/UserContext";
import Chefs from "./pages/Chefs";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(checkToken());
  }, []);
  // const isLoggedIn = checkToken();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="">
        {/* <h1 className=" text-[500px] text-green-400">{`${isLoggedIn}`}</h1> */}
        <NavBar></NavBar>
        <Routes>
          <Route path="*" Component={NotFound} />
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/profile" Component={MyProfile} />
          <Route path="/chefs" Component={Chefs} />
          <Route path="/recipes/chosen/:recipeId" Component={RecipeDetails} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;

// //AUTO PHOTO TRANSITION
// // import { useState, useEffect } from "react"
// // import { ChevronLeft, ChevronRight } from "react-feather"

// // export default function Carousel({
// //   children: slides,
// //   autoSlide = false,
// //   autoSlideInterval = 3000,
// // }) {
// //   const [curr, setCurr] = useState(0)

// //   const prev = () =>
// //     setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
// //   const next = () =>
// //     setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

// //   useEffect(() => {
// //     if (!autoSlide) return
// //     const slideInterval = setInterval(next, autoSlideInterval)
// //     return () => clearInterval(slideInterval)
// //   }, [])
// //   return (
// //     <div className="overflow-hidden relative">
// //       <div
// //         className="flex transition-transform ease-out duration-500"
// //         style={{ transform: `translateX(-${curr * 100}%)` }}
// //       >
// //         {slides}
// //       </div>
// //       <div className="absolute inset-0 flex items-center justify-between p-4">
// //         <button
// //           onClick={prev}
// //           className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
// //         >
// //           <ChevronLeft size={40} />
// //         </button>
// //         <button
// //           onClick={next}
// //           className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
// //         >
// //         <ChevronRight size={40} />
// //         </button>
// //       </div>

// //       <div className="absolute bottom-4 right-0 left-0">
// //         <div className="flex items-center justify-center gap-2">
// //           {slides.map((_, i) => (
// //             <div
// //               className={`
// //               transition-all w-3 h-3 bg-white rounded-full
// //               ${curr === i ? "p-2" : "bg-opacity-50"}
// //             `}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// //COLLAPSE MENUE BUTTON
//   const [show, setShow] = useState(false);

// const toggleShow = () => setShow(!show);
//import { TECollapse, TERipple } from "tw-elements-react";
// import { Route, Routes } from "react-router-dom";
// {
//   /* <>
//           <TERipple rippleColor="light">
//             <a
//               className="inline-block rounded bg-primary mr-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//               role="button"
//               onClick={toggleShow}
//             >
//               Link
//             </a>
//           </TERipple>
//           <TERipple rippleColor="light">
//             <button
//               type="button"
//               className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//               onClick={toggleShow}
//             >
//               Button
//             </button>
//           </TERipple>

//           <TECollapse show={show}>
//             <div className="block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 dark:text-neutral-50">
//               Some placeholder content for the collapse component. This panel is
//               hidden by default but revealed when the user activates the
//               relevant trigger.
//             </div>
//           </TECollapse>
//         </> */
// }
