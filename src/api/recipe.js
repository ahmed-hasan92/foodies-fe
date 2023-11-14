import instance from ".";

const getAllRecipes = async () => {
  const { data } = await instance.get("/recipes");
  return data;
};

const getRecipeId = async (recipeId) => {
  const { data } = await instance.get(`/recipes/${recipeId}`);
  return data;
};

const createRecipe = async ({
  title,
  image,
  hour,
  minute,
  ingredients,
  shortDescription,
  description,
  selectedCategory,
}) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("shortDescription", shortDescription);
  formData.append("description", description);
  formData.append("hour", hour);
  formData.append("minute", minute);
  ingredients.forEach((ingredient) => {
    formData.append("ingredients", ingredient);
  });
  if (image) formData.append("image", image);

  const { data } = await instance.post(
    `/user/recipe/${selectedCategory}`,
    formData
  );
  return data;
};

const updateRecipe = async (
  recipeId,
  title,
  shortDescription,
  description,
  image
) => {
  const { data } = await instance.put(`/recipes/${recipeId}`, {
    title,
    shortDescription,
    description,
    image,
  });
  return data;
};

const deleteRecipe = async (recipeId) => {
  const { data } = await instance.delete(`/recipes/${recipeId}`);
  return data;
};

export { getAllRecipes, getRecipeId, createRecipe, updateRecipe, deleteRecipe };

// const createRecipe = async (title, shortDescription, description, image) => {
//   const { data } = await instance.post(`/user/recipe/:categoryId`, {
//     title,
//     shortDescription,
//     description,
//     image,
//   });
//   return data;
// };
