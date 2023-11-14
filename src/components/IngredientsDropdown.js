import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createIngedient, getAllIngredients } from "../api/ingredient";

const IngredientsDropdown = ({ selected, setSelected }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => getAllIngredients(),
  });

  const { mutate: createIngredientMutation } = useMutation({
    mutationKey: ["create-ingredient"],
    mutationFn: (name) => createIngedient(name),
    onSuccess: () => {
      setSelected(selected.filter((select) => select instanceof Object));
      refetch();
    },
  });

  const options = data?.map((ingredient) => {
    return {
      label: ingredient.name,
      value: ingredient._id,
    };
  });

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        isCreatable={true}
        onCreateOption={(data) => {
          createIngredientMutation(data);
          return data;
        }}
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default IngredientsDropdown;
