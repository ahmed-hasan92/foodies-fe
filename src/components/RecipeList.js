import React from "react";
import RecipeItem from "./RecipeItem";
import { getAllRecipes } from "../api/recipe";
import { useQuery } from "@tanstack/react-query";

const RecipeList = () => {
  const { data: recipeList } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
  });

  const mappedRecipes = recipeList?.map((recipe) => {
    return <RecipeItem recipe={recipe} recipeId={recipe._id} />;
  });

  return <div className="flex flex-row w-full">{mappedRecipes}</div>;
};

export default RecipeList;
