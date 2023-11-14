import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../api/recipe";
import RecipeModal from "../components/RecipeModal";
import RecipeItem from "../components/RecipeItem";

const MyRecipes = () => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: recipesData } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
  });

  const recipeList = recipesData
    ?.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    )
    .map((recipe) => <RecipeItem recipe={recipe} key={recipe._id} />);

  console.log(recipeList);
  return (
    <>
      <div className="bg-[#333333] h-screen w-full flex flex-col justify-center items-center">
        <div className="w-[76vw] flex h-[30px] mb-[30px] mt-[30px]">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search"
            className="w-[70%] flex justify-start items-center border border-white rounded-md"
          />
          <button
            className="ml-auto w-[25%] px-3 py-2 rounded-md text-sm md:text-xl border border-white flex justify-center items-center bg-[#910808] hover:bg-[#B73232]"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Recipe
          </button>
        </div>
        <div className=" flex flex-col flex-wrap md:flex-row gap-[20px] w-[76vw]  justify-center items-center mb-[50px]">
          {recipeList}
        </div>
      </div>
      <RecipeModal show={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default MyRecipes;
