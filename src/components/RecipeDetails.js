import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe, getRecipeId } from "../api/recipe";
import { useParams } from "react-router-dom";
import RecipeUpdate from "./RecipeUpdate";
import { Trash2 } from "lucide-react";
import DeleteModal from "./DeleteModal";
import UserContext from "../context/UserContext";

const RecipeDetails = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { user } = useContext(UserContext);
  const { recipeId } = useParams();

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries(["recipeDetail", recipeId]);
      setShowDelete(false);
    },
  });

  const handleDelete = () => {
    deleteMutate(recipeId);
  };

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipeDetail", recipeId],
    queryFn: () => getRecipeId(recipeId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!recipe) return <div>No recipe found</div>;

  const mappedIngredients = recipe.ingredients.map((ingredient) => {
    return <div key={ingredient._id}>{ingredient.name}</div>;
  });

  console.log(recipe.user._id == user._id, { user, recipe_user: recipe.user });
  return (
    <div className="bg-[#333333] min-h-screen flex flex-row text-white pt-[97px]">
      <div className="w-1/2 px-[150px] ">
        <div className="bg-white py-[3px] pb-[60px] w-full flex flex-row justify-center items-center rounded-b-3xl drop-shadow-[0_30px_30px_rgba(0,0,0,0.60)]">
          <div classname="h-full w-full">
            <img
              classname=""
              src={`http://localhost:8000/${recipe.image}`}
              alt="Recipe Image"
            />
          </div>
        </div>
        <div className="flex flex-col items-center pt-[40px]">
          <div className="font-bold text-[60px]">{recipe.title}</div>
          <div className="flex flex-row justify-center items-center gap-[30px]">
            <div className="flex flex-row gap-[10px]">
              <div className="flex flex-col items-center">
                <div className="text-[60px]">{recipe.hour}</div>
                <div className="text-[20px]">Hours</div>
              </div>
              <div className="text-[60px] text-center">+</div>
              <div className="flex flex-col items-center">
                <div className="text-[60px]">{recipe.minute}</div>
                <div className="text-[20px] text-center">Minutes</div>
              </div>
            </div>
            <div className="text-[100px] font-thin">|</div>
            <div className="flex flex-col items-center">
              <div className="text-[60px]">{recipe.ingredients.length}</div>
              <div className="text-[20px] text-center">Ingredients</div>
            </div>
          </div>
          <div className="pt-[20px] flex flex-row gap-[40px]">
            {recipe.user._id == user._id && (
              <button
                className="px-[20px] py-[10px] gap-[10px] flex flex-row items-center bg-[#910808] font-bold text-[20px] text-white rounded-md hover:bg-[#b73232] transition-colors"
                onClick={() => setShowUpdate(true)}
              >
                Update Recipe
              </button>
            )}

            {showUpdate && recipe && (
              <RecipeUpdate
                show={showUpdate}
                onClose={() => setShowUpdate(false)}
                recipeData={recipe}
              />
            )}
            <div className="flex justify-center items-center cursor-pointer hover:scale-110">
              {recipe.user._id == user._id && (
                <Trash2 onClick={() => setShowDelete(true)} size={32} />
              )}

              {showDelete && (
                <DeleteModal
                  handleDelete={handleDelete}
                  show={showDelete}
                  onClose={() => setShowDelete(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 min-h-screen flex flex-col gap-[40px] px-[80px] items-center pt-[50px] bg-black bg-opacity-25">
        <div className="text-[40px] font-bold">"{recipe.shortDescription}"</div>
        <div className="text-[32px] font-bold">
          <span className="pr-[5px] font-light">Created by |</span>
          {recipe.user.username}
        </div>
        <div className="w-full">
          <div className="font-bold text-[32px]">Ingredients</div>
          <div>{mappedIngredients}</div>
        </div>
        <div>
          <div className="font-bold text-[32px]">Directions</div>
          <div>{recipe.description}</div>
        </div>
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

{
  /* <button
onClick={onOpen}
className="px-[20px] py-[10px] gap-[10px] flex flex-row items-center bg-[#910808] font-bold text-[20px] text-white rounded-md hover:bg-[#b73232] transition-colors"
>
Update Recipe
</button> */
}
