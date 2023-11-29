import React from "react";
// import RecipeItem from "./RecipeItem";
import ChefRecipeItem from "./ChefRecipeItem";

const ChefsRecipes = ({ chef }) => {
  const recipes = chef.recipes; // Use recipes from the chef object

  const recipeItems = recipes.map((recipe) => (
    <ChefRecipeItem recipe={recipe} key={recipe._id} />
  ));

  return (
    <div className="flex flex-row overflow-auto hover:overflow-scroll scroll no-scrollbar gap-4 w-full h-full ">
      {recipeItems}
    </div>
  );
};

export default ChefsRecipes;
