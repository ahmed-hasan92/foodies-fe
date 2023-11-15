import React from "react";
import RecipeItem from "./RecipeItem";
import { getAllRecipes } from "../api/recipe";
import { useQuery } from "@tanstack/react-query";

const RecipeList = ({ selectedCategory, setSelectedCategory, query }) => {
  const { data: recipeList } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
  });

  // console.log("Selected Category:", selectedCategory); // Debugging log

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

  return <div className="flex flex-row w-full">{filteredRecipes}</div>;
};

export default RecipeList;

// const mappedRecipes = recipeList?.map((recipe) => {
//   return <RecipeItem recipe={recipe} recipeId={recipe._id} />;
// });

//   const filteredRecipess = recipeList
//   ?.filter((recipe) => {
//     const searchIncludesQuery = recipe.title.includes(query);
//     const categoryMatches =
//       !selectedCategory || recipe.category._id === selectedCategory._id;
//     return searchIncludesQuery && categoryMatches;
//   })
//   .map((recipe) => {
//     return (
//       <RecipeItem recipe={recipe} recipeId={recipe._id} key={recipe._id} />
//     );
//   });

// return <div className="flex flex-row w-full">{filteredRecipess}</div>;
// };
