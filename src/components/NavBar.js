import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  QueueListIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { logout } from "../api/auth";
import { useContext } from "react";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("handleLogout");
    logout();
    setUser(false);
    navigate("/login");
  };

  return (
    <div className="fixed top-0 z-50 h-[100px] flex flex-row w-full items-center drop-shadow-[0_30px_30px_rgba(0,0,0,0.60)] justify-center bg-[#910808] text-white sm:text-sm lg:text-2xl">
      <div className="w-[10%] h-full flex justify-start">
        <img
          className="w-[80px]"
          src="/assets/logo/foodify-logo.svg"
          alt="SVG"
        />
      </div>
      <div className="w-[80%] flex justify-center items-center">
        <List className=" w-full flex flex-row gap-[50px] justify-center items-center">
          {!user ? (
            <>
              <NavLink to="login">
                <ListItem className="w-fit px-[10px] flex justify-center lg:text-xl sm:text-sm active:bg-[#b73232] hover:bg-[#b73232] cursor-pointer">
                  <ListItemPrefix>
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Signin
                </ListItem>
              </NavLink>
              <NavLink to="/register">
                <ListItem className="w-fit px-[10px] flex justify-center lg:text-xl sm:text-sm active:bg-[#b73232] hover:bg-[#b73232] cursor-pointer">
                  <ListItemPrefix>
                    <PlusIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Register
                </ListItem>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/">
                <ListItem className="w-fit px-[10px] flex justify-center lg:text-xl sm:text-sm active:bg-[#b73232] hover:bg-[#b73232] cursor-pointer">
                  <ListItemPrefix>
                    <HomeIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Home
                </ListItem>
              </NavLink>
              <NavLink to="/profile">
                <ListItem className="w-fit px-[10px] flex justify-center lg:text-xl sm:text-sm active:bg-[#b73232] hover:bg-[#b73232] cursor-pointer">
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  My Profile
                </ListItem>
              </NavLink>
              <NavLink to="recipes">
                <ListItem className="w-fit px-[10px] flex justify-center lg:text-xl sm:text-sm active:bg-[#b73232] hover:bg-[#b73232] cursor-pointer">
                  <ListItemPrefix>
                    <QueueListIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Recipes
                </ListItem>
              </NavLink>
              <ListItem
                onClick={() => {
                  handleLogout();
                }}
                className="w-[10%] px-[10px] flex justify-center lg:text-xl sm:text-sm hover:bg-[#b73232] cursor-pointer"
              >
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Logout
              </ListItem>
            </>
          )}
        </List>
      </div>
      <div className="w-fit flex justify-center text-center items-center">
        <img
          className="h-[25px]"
          src="/assets/navbar/socials-navbar.svg"
          alt="SVG"
        />
      </div>
    </div>
  );
}
export default NavBar;

// import React from "react";
// import { NavLink } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <div className="min-h-screen w-[230px] bg-[#910808] flex flex-col text-center py-[50px]  drop-shadow-[0_30px_30px_rgba(0,0,0,0.50)]">
//       <div className="flex flex-col gap-[40px]">
//         <div className="w-full flex justify-center text-center">
//           <img className="" src="/assets/logo/foodify-logo.svg" alt="SVG" />
//         </div>
//         <div className="flex flex-col gap-[20px]">
//           <NavLink to="/login" className="text-white">
//             SIGN IN
//           </NavLink>
//           <NavLink to="/register" className="text-white">
//             REGISTER
//           </NavLink>
//           <div className="text-white">ABOUT US</div>
//         </div>
//         <div className="w-full flex justify-center text-center mt-auto">
//           <img
//             className="h-[25px] fixed bottom-[50px]"
//             src="/assets/navbar/socials-navbar.svg"
//             alt="SVG"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

// // import { useState } from "react";

// // const NavBar = () => {
// //   const [isHovered, setIsHovered] = useState(false);

// //   const handleMouseEnter = () => {
// //     setIsHovered(true);
// //   };

// //   const handleMouseLeave = () => {
// //     setIsHovered(false);
// //   };

// //   const navBarContainerStyle = {
// //     width: isHovered ? "230px" : "50px", // Adjust the width as needed
// //     transition: "width 0.3s ease-in-out",
// //   };

// //   const navBarStyle = {
// //     opacity: isHovered ? 1 : 0, // Adjust the opacity as needed
// //     transition: "opacity 0.3s ease-in-out",
// //   };

// //   return (
// //     <div
// //       className="flex"
// //       onMouseEnter={handleMouseEnter}
// //       onMouseLeave={handleMouseLeave}
// //       style={navBarContainerStyle}
// //     >
// //       <div
// //         className="w-[230px] bg-[#910808] flex flex-col text-center py-[50px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.50)]"
// //         style={navBarStyle}
// //       >
// //         <div className="flex flex-col gap-[40px]">
// //           <div className="w-full flex justify-center text-center">
// //             <img className="" src="/assets/logo/foodify-logo.svg" alt="SVG" />
// //           </div>
// //           <div>
// //             <div className="text-white">SIGN IN</div>
// //             <div className="text-white">SIGN IN</div>
// //           </div>
// //         </div>
// //         {/* Sticky socials-navbar */}
// //         <div className="w-full flex justify-center text-center mt-auto">
// //           <img
// //             className="h-[25px]"
// //             src="/assets/navbar/socials-navbar.svg"
// //             alt="SVG"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// return (
//   <div className="fixed top-0 z-50 h-[100px] flex flex-row w-full items-center drop-shadow-[0_30px_30px_rgba(0,0,0,0.60)] justify-around bg-[#910808] text-white sm:text-sm lg:text-2xl">
//     <div className="h-full flex justify-center">
//       <img
//         className="w-[80px]"
//         src="/assets/logo/foodify-logo.svg"
//         alt="SVG"
//       />
//     </div>
//     <div className="">
//       <List className=" w-full flex flex-row gap-[20px]">
//         {!user ? (
//           <>
//             <NavLink to="login">
//               <ListItem className="w-full flex justify-center lg:text-xl sm:text-sm ">
//                 <ListItemPrefix>
//                   <ArrowRightOnRectangleIcon className="h-5 w-5" />
//                 </ListItemPrefix>
//                 Signin
//               </ListItem>
//             </NavLink>
//             <NavLink to="/register">
//               <ListItem className="w-full px-[10px] flex justify-center lg:text-xl sm:text-sm active:underline">
//                 <ListItemPrefix>
//                   <PlusIcon className="h-5 w-5" />
//                 </ListItemPrefix>
//                 Register
//               </ListItem>
//             </NavLink>
//           </>
//         ) : (
//           <>
//             <NavLink to="/">
//               <ListItem className="w-full px-[10px] flex justify-center lg:text-xl sm:text-sm active:underline">
//                 <ListItemPrefix>
//                   <HomeIcon className="h-5 w-5" />
//                 </ListItemPrefix>
//                 Home
//               </ListItem>
//             </NavLink>
//             <NavLink to="/profile">
//               <ListItem className="w-full px-[10px] flex justify-center lg:text-xl sm:text-sm active:underline">
//                 <ListItemPrefix>
//                   <UserCircleIcon className="h-5 w-5" />
//                 </ListItemPrefix>
//                 Profile
//               </ListItem>
//             </NavLink>
//             <NavLink to="recipes">
//               <ListItem className="w-full px-[10px] flex justify-center lg:text-xl sm:text-sm active:underline">
//                 <ListItemPrefix>
//                   <QueueListIcon className="h-5 w-5" />
//                 </ListItemPrefix>
//                 Recipes
//               </ListItem>
//             </NavLink>
//             <ListItem
//               onClick={() => {
//                 handleLogout();
//               }}
//               className="w-full px-[10px] flex justify-center lg:text-xl sm:text-sm"
//             >
//               <ListItemPrefix>
//                 <PowerIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Logout
//             </ListItem>
//           </>
//         )}
//       </List>
//     </div>
//     <div className="w-fit flex justify-center text-center items-center">
//       <img
//         className="h-[25px]"
//         src="/assets/navbar/socials-navbar.svg"
//         alt="SVG"
//       />
//     </div>
//   </div>
// );
