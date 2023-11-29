import React from "react";
import { Link } from "react-router-dom";

const ChefRecipeItem = ({ recipe, recipeId }) => {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div class="w-full h-full">
      <div class="group h-[250px] w-[250px] relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-2xl">
        <div class="h-full w-full">
          <img
            class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 rounded-2xl"
            src={`http://localhost:8000/${recipe.image}`}
            alt="Recipe Image"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 rounded-2xl"></div>
        <div class="absolute inset-0 flex translate-y-[50%] flex-col gap-[10px] items-center justify-center px-7 text-center transition-all duration-500 group-hover:translate-y-0 ">
          <h1 class="font-dmserif text-2xl font-bold text-white">
            {recipe.title}
          </h1>
          <p class="mb-1 text-base italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {recipe.shortDescription}
          </p>
          <div class="flex flex-col mb-1 text-base normal text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <Link to={`/recipes/chosen/${recipe._id}`}>
            <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 cursor-pointer hover:bg-[#910808] hover:scale-125 hover:transition-transform hover:duration-500">
              Read Recipe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChefRecipeItem;
