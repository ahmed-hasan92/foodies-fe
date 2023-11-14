// import React, { useState } from "react";
// import Input from "./input.js";
// import { createRecipe } from "../api/recipe.js";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// const RecipeModal = ({ show, setShowModal }) => {
//   const [title, setTitle] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");

//   const queryClient = useQueryClient();
//   const { mutate: handleSubmitRecipe } = useMutation({
//     mutationKey: ["createRecipe"],
//     mutationFn: () => createRecipe(title, shortDescription, description, image),
//     onSuccess: () => {
//       setShowModal(false);
//       queryClient.invalidateQueries(["recipes"]);
//     },
//   });

//   // const handleDescriptionChange = (e) => {
//   //   setDescription(e.target.value);
//   // };

//   if (!show) return "";

//   return (
//     <div className="inset-0 fixed  flex justify-center items-center flex-col z-20 overflow-hidden">
//       <div className="bg-black absolute z-0 opacity-60 inset-0 "></div>
//       <div className="relative z-10 flex flex-col gap-3 border-[3px] border-black rounded-md w-[95%] md:w-[60%] h-[80%] md:h-[80%] bg-white pt-[50px]">
//         <button
//           className="right-0 top-2 absolute w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-red-400"
//           onClick={() => {
//             setShowModal(false);
//           }}
//         >
//           Close
//         </button>
//         <Input
//           name="Recipe Name"
//           onChange={(e) => {
//             setTitle(e.target.value);
//           }}
//         />
//         <Input
//           name="Short Description"
//           onChange={(e) => {
//             setShortDescription(e.target.value);
//           }}
//         />
//         <Input
//           name="Description"
//           onChange={(e) => {
//             setDescription(e.target.value);
//           }}
//         />
//         {/* <div className="mb-6">
//           <label
//             htmlFor="body"
//             className="block text-white text-sm font-medium mb-2"
//           >
//             Body
//           </label>
//           <textarea
//             name="description"
//             value={description}
//             onChange={handleDescriptionChange}
//             className="w-full  px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={10}
//             required
//           />
//         </div> */}
//         <Input
//           name="Recipe Image Link"
//           onChange={(e) => {
//             setImage(e.target.value);
//           }}
//         />

//         <button
//           onClick={handleSubmitRecipe}
//           className="w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-green-400"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeModal;
