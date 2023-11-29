import React, { useState } from "react";
import ChefItem from "../components/ChefItem";
import { getAllUsers } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

const Chefs = () => {
  const [query, setQuery] = useState("");

  const { data: chefsList, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const filteredChefs = chefsList?.filter((chef) =>
    chef.username.toLowerCase().includes(query.toLowerCase())
  );

  const mappedchefs = filteredChefs?.map((chef) => (
    <ChefItem chef={chef} isLoading={isLoading} key={chef._id} />
  ));

  const handleSearch = (e) => {
    setQuery(e.target.value); // Update the search query state
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-[60px] bg-[#333333] px-[150px] pt-[150px] pb-[100px]">
      <div className="flex flex-row w-full justify-center items-center">
        <h1 className="text-white text-[24px] font-bold items-center">
          BROWSE BY CHEFS
        </h1>
      </div>
      <div className="w-full border flex bg-white p-2 px-[20px] justify-center items-center rounded-full">
        <input
          type="text"
          id="search"
          className="form-control w-full h-full"
          placeholder="Search by recipe name"
          onChange={handleSearch}
        />
        <div className="text-[#910808]">
          <Search />
        </div>
      </div>
      <div className="flex flex-col gap-[40px] w-full">{mappedchefs}</div>
    </div>
  );
};

export default Chefs;
