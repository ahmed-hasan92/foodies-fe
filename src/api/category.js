import instance from ".";

const getAllCategories = async () => {
  const { data } = await instance.get("/categories");
  return data;
};

const getCategoryId = async (categoryId) => {
  const { data } = await instance.get(`/categories/${categoryId}`);
  return data;
};

const createCategory = async (name, imageFile) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", imageFile);

  const { data } = await instance.post(`/categories`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

const updateCategory = async (categoryId, name, image) => {
  const { data } = await instance.put(`/categories/${categoryId}`, {
    name,
    image,
  });
  return data;
};

const deleteCategory = async (categoryId) => {
  const { data } = await instance.delete(`/categories/${categoryId}`);
  return data;
};

export {
  getAllCategories,
  getCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
};

// const createCategory = async (name, image) => {
//   const { data } = await instance.post(`/categories`, {
//     name,
//     image,
//   });
//   return data;
// };
