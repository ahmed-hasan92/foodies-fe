import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../api/recipe";
import CategoryList from "./CategoryList";
import IngredientsDropdown from "./IngredientsDropdown";
import { XCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecipeCreateHome = ({ show, onClose }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [showRecipeAddedMessage, setShowRecipeAddedMessage] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const queryClient = useQueryClient();

  const ingredients = selected?.map((select) => {
    return select.value;
  });
  const { mutate: addRecipe } = useMutation({
    mutationFn: () =>
      createRecipe({
        title,
        image,
        hour,
        minute,
        ingredients,
        shortDescription,
        description,
        selectedCategory,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      setShowRecipeAddedMessage(true);
      setTimeout(() => {
        setShowRecipeAddedMessage(false);
        onClose();
      }, 3000);
      navigate("/");
    },
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRecipeImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleShortDesciptionChange = (e) => {
    setShortDescription(e.target.value);
  };

  const handleDesciptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addRecipe();
  };

  const handleHourChange = (e) => {
    setHour(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#333333] bg-opacity-75 flex items-center justify-center z-10">
      <div className="bg-dotted-paper bg-contain rounded-md shadow-md w-full max-w-[50%] p-6 overflow-scroll max-h-[80%]">
        <div className="flex justify-between">
          <h2 className="text-3xl text-[#910808] font-semibold mb-6">
            Create Recipe
          </h2>
          <div className="text-[#333333] cursor-pointer" onClick={onClose}>
            <XCircleIcon />
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-[#333333] text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-[#333333] bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-[#333333] text-sm font-medium mb-2"
            >
              Recipe Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleRecipeImage}
              className="w-full px-4 py-2 border bg-white border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808] text-[#333333]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="shortDescription"
              className="block text-[#333333] text-sm font-medium mb-2"
            >
              Short Description
            </label>
            <textarea
              id="shortDescription"
              value={shortDescription}
              onChange={handleShortDesciptionChange}
              className="w-full px-4 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
              rows={2}
              required
            />
          </div>
          <div>
            <label
              htmlFor="shortDescription"
              className="block text-[#333333] text-sm font-medium mb-2"
            >
              Preparation Time
            </label>
            <div className="flex flex-row items-center">
              <input
                type="number"
                id="hour"
                name="hour"
                placeholder="Hours"
                onChange={handleHourChange}
                className="w-full px-4 py-2 border bg-white border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808] text-[#333333]"
                required
              />
              <span className="px-[30px]">&</span>
              <input
                type="number"
                id="minute"
                name="minute"
                placeholder="Minutes"
                onChange={handleMinuteChange}
                className="w-full px-4 py-2 border bg-white border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808] text-[#333333]"
                required
              />
            </div>
          </div>
          <div className="flex flex-row py-[20px] overflow-auto hover:overflow-scroll scroll no-scrollbar">
            <CategoryList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <IngredientsDropdown selected={selected} setSelected={setSelected} />
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-[#333333] text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDesciptionChange}
              className="w-full px-4 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
              rows={8}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-[#333333] text-white rounded-md hover:bg-[#444444] transition-colors"
            >
              Cancel
            </button>
            {showRecipeAddedMessage && (
              <div className="text-[#910808] text-center mt-4 font-bold">
                You successfully added a recipe!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeCreateHome;
