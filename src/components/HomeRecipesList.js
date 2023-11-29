import React from "react";
import RecipeItem from "./RecipeItem";
import { getAllRecipes } from "../api/recipe";
import { useQuery } from "@tanstack/react-query";

const HomeRecipesList = ({ selectedCategory, query }) => {
  const { data: recipeList } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
  });

  const filteredRecipes = recipeList
    ?.filter((recipe) => {
      return recipe.title.toLowerCase().includes(query.toLowerCase());
    })
    .filter((recipe) => {
      // Check if a category is selected and if the recipe belongs to that category
      return selectedCategory
        ? recipe.category?._id === selectedCategory
        : true;
    })
    .map((recipe) => {
      return <RecipeItem recipe={recipe} key={recipe._id} />;
    });

  return (
    <div className="flex flex-wrap gap-4 w-full h-full">{filteredRecipes}</div>
  );
};

export default HomeRecipesList;
