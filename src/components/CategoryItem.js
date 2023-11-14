import React from "react";

const CategoryItem = ({ category, selectedCategory, setSelectedCategory }) => {
  return (
    <>
      <div
        className=" w-fit"
        onClick={() => {
          setSelectedCategory(category._id);
        }}
      >
        <div class="group flex flex-col items-center gap-[10px]">
          <div class="group cursor-pointer items-center justify-center overflow-hidden hover:shadow-xl hover:shadow-black/30 rounded-full ">
            <div class="h-[150px] w-[150px]">
              <img
                class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 group-hover: rounded-2xl"
                src={`http://localhost:8000/${category.image}`}
                alt="Category Image"
                style={
                  selectedCategory == category._id || !selectedCategory
                    ? {}
                    : { filter: " grayscale(100%)" }
                }
              />
            </div>
          </div>
          <div className="text-[18px] text-zinc-400 text-opacity-50 group-hover:font-bold cursor-pointer group-hover:text-white group-hover:text-opacity-100 ">
            {category.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
