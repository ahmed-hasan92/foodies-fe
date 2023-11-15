import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../api/recipe";
import CategoryList from "./CategoryList";
import IngredientsDropdown from "./IngredientsDropdown";

const RecipeCreate = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

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
      }, 3000);
      onClose();
    },
  });

  // const { data: categories, isLoading: isLoadingCategories } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: getAllCategories,
  // });

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

  // const handleIngredientChange = (e, index) => {
  //   const updatedIngredients = [...ingredients];
  //   updatedIngredients[index] = e.target.value;
  //   setIngredients(updatedIngredients);
  // };

  const handleDesciptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const handleCreateIngredient = () => {
  //   setIngredients([...ingredients, ""]);
  // };

  // const handleRemoveIngredient = (index) => {
  //   const updatedIngredients = [...ingredients];
  //   updatedIngredients.splice(index, 1);
  //   setIngredients(updatedIngredients);
  // };

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
      <div className="bg-dotted-paper bg-contain rounded-md shadow-md w-full max-w-[50%] p-6 overflow-scroll max-h-[70%]">
        <h2 className="text-3xl text-[#910808] font-semibold mb-6">
          Create Recipe
        </h2>
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
              type="file" //by default it's text
              id="image"
              name="image" //this will show in console, i can name it anything
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
              <div className="text-[#910808] text-center mt-4">
                You successfully added a recipe!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeCreate;

// import React, { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Delete } from "lucide-react";
// import { createARecipe } from "../api/auth";
// import { getAllIngredients } from "../api/ingredient";

// const RecipeCreate = ({ show, onClose, onSave }) => {
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
//   const [showRecipeAddedMessage, setShowRecipeAddedMessage] = useState(false);

//   const queryClient = useQueryClient();

//   // USEQUERY - GET ALL INGREDIENTS
//   const { data: ingredients, isLoading: isLoadingIngredients } = useQuery({
//     queryKey: ["ingredients"],
//     queryFn: () => getAllIngredients(),
//   });

//   //TOGGLE INGREDIENTS
//   const toggleIngredientSelection = (ingredientId) => {
//     setSelectedIngredientIds((prev) => {
//       if (prev.includes(ingredientId)) {
//         // Remove if already selected
//         return prev.filter((id) => id !== ingredientId);
//       } else {
//         // Add if not selected
//         return [...prev, ingredientId];
//       }
//     });
//   };

//   const { mutate: addRecipe } = useMutation({
//     mutationFn: () =>
//       createARecipe({
//         title,
//         image,
//         ingredient: ingredients,
//         shortDescription,
//         description,
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["recipes"]);
//       setShowRecipeAddedMessage(true);
//       setTimeout(() => {
//         setShowRecipeAddedMessage(false);
//       }, 3000);
//       onClose();
//     },
//   });

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleRecipeImage = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const handleShortDesciptionChange = (e) => {
//     setShortDescription(e.target.value);
//   };

//   const handleIngredientChange = (e, index) => {
//     const updatedIngredients = [...ingredients];
//     updatedIngredients[index] = e.target.value;
//     setSelectedIngredientIds(updatedIngredients);
//   };

//   const handleDesciptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleAddIngredient = () => {
//     setSelectedIngredientIds([...selectedIngredientIds, ""]);
//   };

//   const handleRemoveSelectedIngredient = (index) => {
//     const updatedSelectedIngredients = selectedIngredientIds.filter(
//       (_, i) => i !== index
//     );
//     setSelectedIngredientIds(updatedSelectedIngredients);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     addRecipe(
//       title,
//       shortDescription,
//       description,
//       image,
//       selectedIngredientIds
//     );
//   };

//   const getIngredientNames = (ingredientIds) => {
//     return ingredientIds.map((id) => {
//       const ingredient = ingredients.find(
//         (ingredient) => ingredient._id === id
//       );
//       return ingredient ? ingredient.name : "Unknown";
//     });
//   };

//   if (!show) {
//     return null;
//   }

//   if (isLoadingIngredients) {
//     return <div>Loading ingredients...</div>;
//   }

//   const ingredientButtons = ingredients?.map((ingredient) => (
//     <button
//       key={ingredient._id}
//       onClick={() => toggleIngredientSelection(ingredient._id)}
//       className={`ingredient-button ${
//         selectedIngredientIds.includes(ingredient._id) ? "selected" : ""
//       }`}
//     >
//       {ingredient.name}
//     </button>
//   ));

//   return (
//     <div className="fixed inset-0 bg-[#333333] bg-opacity-75 flex items-center justify-center z-10">
//       <div className="bg-dotted-paper bg-contain rounded-md shadow-md w-full max-w-[50%] p-6 overflow-scroll max-h-[70%]">
//         <h2 className="text-3xl text-[#910808] font-semibold mb-6">
//           Create Recipe
//         </h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="title"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={handleTitleChange}
//               className="w-full px-4 py-2 border border-[#333333] bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="image"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Recipe Image
//             </label>
//             <input
//               type="file" //by default it's text
//               id="image"
//               name="image" //this will show in console, i can name it anything
//               onChange={handleRecipeImage}
//               className="w-full px-4 py-2 border bg-white border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808] text-[#333333]"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="shortDescription"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Short Description
//             </label>
//             <textarea
//               id="shortDescription"
//               value={shortDescription}
//               onChange={handleShortDesciptionChange}
//               className="w-full px-4 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
//               rows={2}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="ingredients"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Ingredients
//             </label>
//             {ingredients.map((ingredient, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="text"
//                   value={ingredient}
//                   onChange={(e) => handleIngredientChange(e, index)}
//                   className="w-full px-4 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSelectedIngredient(index)}
//                   className="ml-2 px-2 py-1 bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
//                 >
//                   <Delete />
//                 </button>
//               </div>
//             ))}
//             <div className="ingredient-buttons">{ingredientButtons}</div>

//             <div>
//               {getIngredientNames(selectedIngredientIds).map((name, index) => (
//                 <div key={index} className="selected-ingredient-name">
//                   {name}
//                 </div>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={handleAddIngredient}
//               className="px-2 py-1 bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
//             >
//               Add Ingredients
//             </button>
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="description"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={handleDesciptionChange}
//               className="w-full px-4 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
//               rows={4}
//               required
//             />
//           </div>
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="ml-2 px-4 py-2 bg-[#333333] text-white rounded-md hover:bg-[#444444] transition-colors"
//             >
//               Cancel
//             </button>
//             {showRecipeAddedMessage && (
//               <div className="text-[#910808] text-center mt-4">
//                 You successfully added a recipe!
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RecipeCreate;

// import React, { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createRecipe } from "../api/recipe";
// import { Delete } from "lucide-react";

// const RecipeCreate = ({ show, onClose, onSave }) => {
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [ingredients, setIngredients] = useState([]);
//   const [description, setDescription] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [showRecipeAddedMessage, setShowRecipeAddedMessage] = useState(false);
//   const queryClient = useQueryClient();
//   const { mutate: addRecipe } = useMutation({
//     mutationFn: () =>
//       createRecipe({
//         title,
//         image,
//         ingredient: ingredients,
//         shortDescription,
//         description,
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["recipes"]);
//       setShowRecipeAddedMessage(true);
//       setTimeout(() => {
//         setShowRecipeAddedMessage(false);
//       }, 3000);
//       onClose();
//     },
//   });
//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleRecipeImage = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const handleShortDesciptionChange = (e) => {
//     setShortDescription(e.target.value);
//   };

//   const handleIngredientChange = (e, index) => {
//     const updatedIngredients = [...ingredients];
//     updatedIngredients[index] = e.target.value;
//     setIngredients(updatedIngredients);
//   };

//   const handleDesciptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleCreateIngredient = () => {
//     setIngredients([...ingredients, ""]);
//   };

//   const handleRemoveIngredient = (index) => {
//     const updatedIngredients = [...ingredients];
//     updatedIngredients.splice(index, 1);
//     setIngredients(updatedIngredients);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     addRecipe();
//   };

//   if (!show) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 bg-[#333333] bg-opacity-75 flex items-center justify-center z-10">
//       <div className="bg-dotted-paper bg-contain rounded-md shadow-md w-full max-w-[50%] p-6 overflow-scroll max-h-[70%]">
//         <h2 className="text-3xl text-[#910808] font-semibold mb-6">
//           Create Recipe
//         </h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="title"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={handleTitleChange}
//               className="w-full px-4 py-2 border border-[#333333] bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="image"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Recipe Image
//             </label>
//             <input
//               type="file" //by default it's text
//               id="image"
//               name="image" //this will show in console, i can name it anything
//               onChange={handleRecipeImage}
//               className="w-full px-4 py-2 border bg-white border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808] text-[#333333]"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="shortDescription"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Short Description
//             </label>
//             <textarea
//               id="shortDescription"
//               value={shortDescription}
//               onChange={handleShortDesciptionChange}
//               className="w-full px-4 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
//               rows={2}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="ingredients"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Ingredients
//             </label>
//             {ingredients.map((ingredient, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="text"
//                   value={ingredient}
//                   onChange={(e) => handleIngredientChange(e, index)}
//                   className="w-full px-4 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveIngredient(index)}
//                   className="ml-2 px-2 py-1 bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
//                 >
//                   <Delete />
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleCreateIngredient}
//               className="px-2 py-1 bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
//             >
//               Add Ingredients
//             </button>
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="description"
//               className="block text-[#333333] text-sm font-medium mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={handleDesciptionChange}
//               className="w-full px-4 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#910808]"
//               rows={4}
//               required
//             />
//           </div>
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="ml-2 px-4 py-2 bg-[#333333] text-white rounded-md hover:bg-[#444444] transition-colors"
//             >
//               Cancel
//             </button>
//             {showRecipeAddedMessage && (
//               <div className="text-[#910808] text-center mt-4">
//                 You successfully added a recipe!
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RecipeCreate;
