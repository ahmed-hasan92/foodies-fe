import React from "react";

const CategoryItem = ({ category, selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = () => {
    // Toggle the selected category
    if (selectedCategory === category._id) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category._id);
    }
  };

  // Apply grayscale if another category is selected
  const isGrayscale = selectedCategory && selectedCategory !== category._id;

  return (
    <>
      <div className="w-fit" onClick={handleCategoryClick}>
        <div className="group flex flex-col items-center gap-[10px]">
          <div className="group cursor-pointer items-center justify-center overflow-hidden hover:shadow-xl hover:shadow-black/30 rounded-full">
            <div className="h-[150px] w-[150px]">
              <img
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 rounded-2xl ${
                  isGrayscale ? "grayscale" : ""
                }`}
                src={`http://localhost:8000/${category.image}`}
                alt="Category Image"
              />
            </div>
          </div>
          <div className="text-[18px] text-zinc-400 text-opacity-50 group-hover:font-bold cursor-pointer group-hover:text-white group-hover:bg-[#333333] group-hover:rounded-md group-hover:px-[10px] group-hover:text-opacity-100">
            {category.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;

// import React from "react";

// const CategoryItem = ({ category, selectedCategory, setSelectedCategory }) => {
//   return (
//     <>
//       <div
//         className=" w-fit"
//         onClick={() => {
//           setSelectedCategory(category._id);
//         }}
//       >
//         <div class="group flex flex-col items-center gap-[10px]">
//           <div class="group cursor-pointer items-center justify-center overflow-hidden hover:shadow-xl hover:shadow-black/30 rounded-full ">
//             <div class="h-[150px] w-[150px]">
//               <img
//                 class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 group-hover: rounded-2xl"
//                 src={`http://localhost:8000/${category.image}`}
//                 alt="Category Image"
//                 style={
//                   selectedCategory == category._id || !selectedCategory
//                     ? {}
//                     : { filter: " grayscale(100%)" }
//                 }
//               />
//             </div>
//           </div>
//           <div className="text-[18px] text-zinc-400 text-opacity-50 group-hover:font-bold cursor-pointer group-hover:text-white group-hover:text-opacity-100 ">
//             {category.name}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CategoryItem;
