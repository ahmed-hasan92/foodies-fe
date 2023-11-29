import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
// import RecipeCreate from "../components/RecipeCreate";
import RecipeDetails from "../components/RecipeDetails";
import HomeRecipesList from "../components/HomeRecipesList";
import RecipeCreateHome from "../components/RecipeCreateHome";

const Home = () => {
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onOpen = () => setShow(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value); // Update the search query state
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-[60px] bg-[#333333] px-[150px] pt-[150px] pb-[100px]">
      <div className="w-full flex flex-row justify-between gap-[40px] text-center align-content">
        <div className="w-full border bg-white p-2 rounded-full">
          <input
            type="text"
            id="search"
            className="form-control w-full h-full"
            placeholder="Search by recipe name"
            onChange={handleSearch}
          />
        </div>
        <div className="flex justify-center items-center">
          <img className="" src="/assets/home/foodify-top-right.svg" />
        </div>
      </div>

      <div className=" flex flex-col gap-[20px]">
        <div className="flex flex-row w-full items-center">
          <h1 className="text-white text-[24px] font-bold items-center">
            BROWSE BY CUSINES
          </h1>
        </div>
        <div className="flex flex-row overflow-auto hover:overflow-scroll scroll no-scrollbar">
          <CategoryList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
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
      <div class="flex flex-wrap gap-4 w-full items-center justify-around ">
        <HomeRecipesList
          onRecipeSelect={handleRecipeSelect}
          selectedCategory={selectedCategory}
          query={query}
        />
        {selectedRecipeId && <RecipeDetails recipeId={selectedRecipeId} />}
      </div>
      <RecipeCreateHome show={show} onClose={onClose} onSave={() => {}} />
    </div>
  );
};

export default Home;
