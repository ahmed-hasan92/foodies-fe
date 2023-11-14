import React from "react";
import CategoryItem from "./CategoryItem";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/category";

const CategoryList = ({ selectedCategory, setSelectedCategory }) => {
  const { data: categoryList } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const mappedCategories = categoryList?.map((category) => {
    return (
      <CategoryItem
        category={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    );
  });
  return (
    <div className="flex flex-row w-full gap-[30px]">{mappedCategories}</div>
  );
};

export default CategoryList;
