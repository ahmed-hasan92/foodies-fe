import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipeId } from "../api/recipe";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipeDetail", recipeId],
    queryFn: () => getRecipeId(recipeId),
  });
  if (!recipe) return <div>Not found!</div>;

  const mappedRecipes = recipe.ingredients.map((recipe) => {
    return <div>{recipe.name}</div>;
  });

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white flex-col">
      <div>{recipe.title}</div>
      <div classname="h-96 w-72">
        <img
          classname="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 rounded-2xl"
          src={`http://localhost:8000/${recipe.image}`}
          alt="Recipe Image"
        />
      </div>
      <div>{recipe.shortDescription}</div>
      <div>{recipe.hour}</div>
      <div>{recipe.minute}</div>
      <div>{recipe.description}</div>
      <div>
        <div>{mappedRecipes}</div>
      </div>
    </div>
  );
};

export default RecipeDetails;

{
  /* <div className="w-[300px] h-[400px] border border-black rounded-md flex flex-col justify-between items-center p-4">
<div>
  <h1 className="text-md font-bold">{recipe.title}</h1>
  <p className="text-gray-400 mb-2">Created by: {user?.name}</p>
  <img
    src={recipe.Image}
    alt={`${recipe.title}-image`}
    className="w-[200px] rounded-md"
  />
  <div className="flex flex-wrap">
    {topic?.map((topic) => (
      <span
        key={topic}
        className="inline-block bg-gray-600 text-gray-200 text-sm px-2 py-1 rounded-md mr-2 mb-2"
      >
        {topic}
      </span>
    ))}
  </div>
  <h1 className="text-sm font-bold">{recipe.shortDescription}</h1>
  <h1 className="text-sm font-bold">{recipe.description}</h1>
  <h1 className="text-sm font-bold">{category.name}</h1>
</div>
</div> */
}
