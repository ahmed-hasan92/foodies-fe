import React from "react";
import ChefsRecipes from "./ChefsRecipes";

const ChefItem = ({ chef, isLoading, query }) => {
  const profileImageUrl = chef?.image
    ? `http://localhost:8000/${chef.image}`
    : "https://cdn1.vectorstock.com/i/1000x1000/97/60/chef-hat-flat-icon-with-red-background-vector-21409760.jpg";

  return (
    <div className="flex flex-row gap-[40px] w-full ">
      <div className="bg-white p-[10px] gap-[20px] min-w-[250px] h-[250px] flex flex-col justify-center items-center rounded-3xl drop-shadow-[0_30px_30px_rgba(0,0,0,0.60)]">
        <div className="h-[150px] w-[150px] border border-solid-[2px] border-white rounded-full overflow-hidden ">
          <img className="object-cover" src={profileImageUrl} alt="Profile" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-[#333333] font-bold flex gap-[5px]">
            Name:
            <span className="font-normal">
              {isLoading ? "loading..." : chef?.username}
            </span>
          </div>
          <div className="text-[#333333] font-bold flex gap-[5px]">
            No. of Recipes:
            <span className="font-normal">
              {isLoading ? "loading..." : chef?.recipes.length}
            </span>
          </div>
        </div>
      </div>
      <div className=" h-full w-full flex justify-evenly overflow-hidden">
        {!isLoading && chef && <ChefsRecipes chef={chef} query={query} />}
      </div>
    </div>
  );
};
//

export default ChefItem;
