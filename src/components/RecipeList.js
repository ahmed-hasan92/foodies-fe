import React from "react";
import RecipeItem from "./RecipeItem";
import { getAllRecipes } from "../api/recipe";
import { useQuery } from "@tanstack/react-query";

const RecipeList = ({ selectedCategory, query }) => {
  const { data: recipeList } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
  });

  const filteredRecipes = recipeList
    ?.filter((recipe) => {
      return recipe.title.toLowerCase().includes(query.toLowerCase());
    })
    .filter((recipe) => {
      console.log(selectedCategory);
      return recipe.category?._id?.includes(selectedCategory);
    })
    .map((recipe) => {
      return <RecipeItem recipe={recipe} key={recipe._id} />;
    });

  return (
    <div className="flex flex-wrap gap-4 w-full h-full">{filteredRecipes}</div>
  );
};

export default RecipeList;
