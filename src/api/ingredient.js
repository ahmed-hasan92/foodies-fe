import instance from ".";

const getAllIngredients = async () => {
  const { data } = await instance.get("/ingredients");
  return data;
};

const createIngedient = async (name) => {
  const { data } = await instance.post(`/ingredients`, {
    name,
  });
  return data;
};

const updateIngedient = async (ingredientId, name) => {
  const { data } = await instance.put(`/ingredients/${ingredientId}`, {
    name,
  });
  return data;
};

const deleteIngedient = async (ingredientId) => {
  const { data } = await instance.delete(`/ingredients/${ingredientId}`);
  return data;
};

export { getAllIngredients, createIngedient, updateIngedient, deleteIngedient };
