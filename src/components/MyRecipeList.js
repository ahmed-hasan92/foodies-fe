import React from "react";
import RecipeItem from "./RecipeItem";
import { useQuery } from "@tanstack/react-query";
import { getMyRecipes } from "../api/auth";

const MyRecipeList = () => {
  const { data: recipeList } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getMyRecipes(),
  });

  const mappedRecipes = recipeList?.map((recipe) => {
    return <RecipeItem recipe={recipe} recipeId={recipe._id} />;
  });

  return (
    <div className="flex flex-wrap gap-4 w-full h-full">{mappedRecipes}</div>
  );
};

export default MyRecipeList;
