import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import RecipeList from "../components/RecipeList";
import RecipeCreate from "../components/RecipeCreate";
import RecipeDetails from "../components/RecipeDetails";

const Home = () => {
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onOpen = () => setShow(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };

  // const noteList = notes?.map((note) => <NoteItem key={note._id} {...note} />);

  return (
    <div className="w-full h-full flex flex-col gap-[60px] bg-[#333333] px-[150px] pt-[150px]">
      <div className="w-full flex flex-row justify-between gap-[40px] text-center align-content">
        <div className="w-full border bg-white p-2 rounded-full">
          <input
            type="text"
            id="search"
            className="form-control w-full h-full"
            placeholder="Search by Chef and Recipe"
            // onChange={handleSearch}
          />
        </div>
        <div className="flex justify-center items-center">
          <img className="" src="/assets/home/foodify-top-right.svg" />
        </div>
      </div>

      <div className=" flex flex-col gap-[20px]">
        <div className="flex flex-row w-full items-center">
          <div className="bg-white w-[40px] flex justify-center items-center rounded-sm mr-[20px]">
            +
          </div>
          <h1 className="text-white text-[24px] font-bold items-center">
            BROWSE BY CUSINES
          </h1>
        </div>
        <div className="flex flex-row overflow-auto hover:overflow-scroll scroll no-scrollbar">
          <CategoryList />
        </div>
      </div>
      <div>
        <h1 className="text-white text-[24px] font-bold items-center pb-[20px]">
          FEATURED RECIPES
        </h1>
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
        >
          Create Recipe
        </button>
      </div>
      <div class="flex flex-row gap-[30px] w-full h-full items-center justify-around ">
        <RecipeList onRecipeSelect={handleRecipeSelect} />
        {selectedRecipeId && <RecipeDetails recipeId={selectedRecipeId} />}
      </div>
      <RecipeCreate show={show} onClose={onClose} onSave={() => {}} />
      <div className="w-full h-full flex justify-center items-center">
        <RecipeDetails />
      </div>
    </div>
  );
};

export default Home;

{
  /* <div class="fixed bottom-16">
<p class="font-com text-2xl font-semibold text-white">
  All Images are from{" "}
  <a href="https://unsplash.com" class="text-blue-500">
    Unsplash.com
  </a>
</p>
</div> */
}
//grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4

//drop-shadow-[0_30px_30px_rgba(0,0,0,0.50)]

/** 
<div class="">
          <div class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-2xl">
            <div class="h-96 w-72">
              <img
                class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 rounded-2xl"
                src="/assets/food/appetizers/Broccoli Cheese Soup.webp"
                alt=""
              />
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 rounded-2xl"></div>
            <div class="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 ">
              <h1 class="font-dmserif text-3xl font-bold text-white">Recipe</h1>
              <p class="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                dolore adipisci placeat.
              </p>
              <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                See More
              </button>
            </div>
          </div>
        </div>
        */
